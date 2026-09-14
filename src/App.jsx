import { useReducer, useEffect, useCallback, useState, useRef } from 'react'
import { gameReducer, initialState } from './store/gameReducer'
import Dashboard from './components/Dashboard'
import LessonView from './components/LessonView'
import Simulation from './components/Simulation'
import Profile from './components/Profile'
import LoginScreen from './components/LoginScreen'
import AdminDashboard from './components/AdminDashboard'
import XPPopup from './components/ui/XPPopup'
import BadgeModal from './components/ui/BadgeModal'
import { supabase } from './lib/supabase'

const ADMIN_EMAIL = 'baptiste.chataignier@gmail.com'

const AVATAR_COLORS = [
  'from-purple-400 to-violet-600',
  'from-blue-400 to-indigo-600',
  'from-pink-400 to-rose-600',
  'from-green-400 to-emerald-600',
]

function getColor(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

function buildProfile(dbProfile) {
  return {
    id: dbProfile.id,
    name: dbProfile.name,
    email: dbProfile.email,
    role: dbProfile.is_admin ? 'admin' : 'user',
    color: getColor(dbProfile.email),
  }
}

export default function App() {
  const [authState, setAuthState] = useState('loading') // loading | unauthenticated | needs_profile | authenticated
  const [supabaseUser, setSupabaseUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const saveRef = useRef(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) handleSession(session)
      else setAuthState('unauthenticated')
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) handleSession(session)
      else {
        setAuthState('unauthenticated')
        setSupabaseUser(null)
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function handleSession(session) {
    setSupabaseUser(session.user)

    const { data: dbProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()

    if (!dbProfile) {
      setAuthState('needs_profile')
      return
    }

    await loadProgress(session.user.id, dbProfile)
  }

  async function loadProgress(userId, dbProfile) {
    const { data: progressData } = await supabase
      .from('user_progress')
      .select('state')
      .eq('user_id', userId)
      .single()

    const built = buildProfile(dbProfile)
    setProfile(built)

    const saved = progressData?.state
    dispatch({
      type: 'LOAD_STATE',
      payload: {
        ...initialState,
        ...(saved || {}),
        user: {
          ...initialState.user,
          name: built.name,
          ...(saved?.user || {}),
        },
        view: ['lesson', 'simulation'].includes(saved?.view) ? 'dashboard' : (saved?.view || 'dashboard'),
        activeLesson: null,
        lessonSession: null,
        activeSimulation: null,
        xpAnimation: null,
        newBadge: null,
      },
    })

    setAuthState('authenticated')
  }

  async function handleCreateProfile(name) {
    const isAdmin = supabaseUser.email === ADMIN_EMAIL
    await supabase.from('profiles').insert({
      id: supabaseUser.id,
      name,
      email: supabaseUser.email,
      is_admin: isAdmin,
    })
    await loadProgress(supabaseUser.id, {
      id: supabaseUser.id,
      name,
      email: supabaseUser.email,
      is_admin: isAdmin,
    })
  }

  // Debounced save to Supabase (1.5s after last change)
  useEffect(() => {
    if (authState !== 'authenticated' || !supabaseUser) return
    clearTimeout(saveRef.current)
    saveRef.current = setTimeout(() => {
      supabase.from('user_progress').upsert({
        user_id: supabaseUser.id,
        state: { user: state.user, view: state.view },
        updated_at: new Date().toISOString(),
      })
    }, 1500)
  }, [state.user, state.view, authState, supabaseUser])

  const clearXPAnimation = useCallback(() => dispatch({ type: 'CLEAR_XP_ANIMATION' }), [])
  const clearBadgeModal  = useCallback(() => dispatch({ type: 'CLEAR_BADGE_MODAL'  }), [])

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  async function handleReset() {
    if (!window.confirm('Réinitialiser toute votre progression ? Cette action est irréversible.')) return
    await supabase.from('user_progress').delete().eq('user_id', supabaseUser.id)
    window.location.reload()
  }

  if (authState === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🤝</div>
          <p className="text-brand-600 font-semibold">Chargement...</p>
        </div>
      </div>
    )
  }

  if (authState === 'unauthenticated') {
    return <LoginScreen />
  }

  if (authState === 'needs_profile') {
    return <SetupProfile onSubmit={handleCreateProfile} />
  }

  return (
    <div className="font-sans antialiased">
      {profile?.role === 'admin' && state.view === 'admin' && (
        <AdminDashboard profile={profile} dispatch={dispatch} onLogout={handleLogout} />
      )}
      {state.view === 'dashboard' && (
        <Dashboard state={state} dispatch={dispatch} profile={profile} onLogout={handleLogout} />
      )}
      {state.view === 'lesson' && state.activeLesson && (
        <LessonView state={state} dispatch={dispatch} />
      )}
      {state.view === 'simulation' && state.activeSimulation && (
        <Simulation state={state} dispatch={dispatch} />
      )}
      {state.view === 'profile' && (
        <Profile state={state} dispatch={dispatch} profile={profile} onLogout={handleLogout} onReset={handleReset} />
      )}
      {state.xpAnimation && (
        <XPPopup amount={state.xpAnimation.amount} onDone={clearXPAnimation} />
      )}
      {state.newBadge && (
        <BadgeModal badgeId={state.newBadge} onClose={clearBadgeModal} />
      )}
    </div>
  )
}

function SetupProfile({ onSubmit }) {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    await onSubmit(name.trim())
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🤝</div>
        <h1 className="font-display font-black text-4xl text-brand-700">NégoMaster</h1>
        <p className="text-gray-500 mt-2">Première connexion — comment souhaitez-vous apparaître ?</p>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="text"
          placeholder="Votre prénom"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 text-lg focus:border-brand-400 focus:outline-none transition-colors"
          autoFocus
        />
        <button
          type="submit"
          disabled={!name.trim() || loading}
          className="w-full bg-brand-600 text-white rounded-2xl py-4 font-bold text-lg disabled:opacity-50 hover:bg-brand-700 transition-colors"
        >
          {loading ? 'Création...' : 'Commencer →'}
        </button>
      </form>
    </div>
  )
}
