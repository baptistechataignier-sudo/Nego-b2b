import { useReducer, useEffect, useCallback, useState } from 'react'
import { gameReducer, initialState } from './store/gameReducer'
import Dashboard from './components/Dashboard'
import LessonView from './components/LessonView'
import Simulation from './components/Simulation'
import Profile from './components/Profile'
import LoginScreen from './components/LoginScreen'
import AdminDashboard from './components/AdminDashboard'
import XPPopup from './components/ui/XPPopup'
import BadgeModal from './components/ui/BadgeModal'

export const PROFILES = [
  { id: 'chloe',    name: 'Chloé',    role: 'user',  color: 'from-pink-400 to-rose-600'     },
  { id: 'arnaud',   name: 'Arnaud',   role: 'user',  color: 'from-blue-400 to-indigo-600'   },
  { id: 'baptiste', name: 'Baptiste', role: 'admin', color: 'from-purple-400 to-violet-600' },
]

function storageKey(profileId) {
  return `negomaster_${profileId}`
}

export function loadProfileState(profileId) {
  try {
    const raw = localStorage.getItem(storageKey(profileId))
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function buildState(profileId) {
  const profile = PROFILES.find(p => p.id === profileId)
  const saved = loadProfileState(profileId)
  if (!saved) {
    return { ...initialState, user: { ...initialState.user, name: profile?.name || 'Apprenant' } }
  }
  return {
    ...initialState,
    ...saved,
    user: { ...initialState.user, name: profile?.name || 'Apprenant', ...saved.user },
    view: saved.view === 'lesson' || saved.view === 'simulation' ? 'dashboard' : (saved.view || 'dashboard'),
    activeLesson: null,
    lessonSession: null,
    activeSimulation: null,
    xpAnimation: null,
    newBadge: null,
  }
}

export default function App() {
  const [currentProfileId, setCurrentProfileId] = useState(
    () => localStorage.getItem('negomaster_current_profile') || null
  )

  const [state, dispatch] = useReducer(
    gameReducer,
    null,
    () => currentProfileId ? buildState(currentProfileId) : initialState
  )

  // Persist user data per profile
  useEffect(() => {
    if (!currentProfileId) return
    try {
      localStorage.setItem(storageKey(currentProfileId), JSON.stringify({
        user: state.user,
        view: state.view,
      }))
    } catch {
      // Storage full — ignore
    }
  }, [state.user, state.view, currentProfileId])

  function handleSelectProfile(profileId) {
    localStorage.setItem('negomaster_current_profile', profileId)
    setCurrentProfileId(profileId)
    dispatch({ type: 'LOAD_STATE', payload: buildState(profileId) })
  }

  function handleLogout() {
    localStorage.removeItem('negomaster_current_profile')
    setCurrentProfileId(null)
  }

  const clearXPAnimation = useCallback(() => dispatch({ type: 'CLEAR_XP_ANIMATION' }), [])
  const clearBadgeModal  = useCallback(() => dispatch({ type: 'CLEAR_BADGE_MODAL'  }), [])

  const profile = PROFILES.find(p => p.id === currentProfileId)

  // No profile selected → login screen
  if (!profile) {
    return <LoginScreen onSelectProfile={handleSelectProfile} />
  }

  return (
    <div className="font-sans antialiased">
      {/* Admin view (Baptiste only) */}
      {profile.role === 'admin' && state.view === 'admin' && (
        <AdminDashboard profile={profile} dispatch={dispatch} onLogout={handleLogout} />
      )}

      {/* Normal views */}
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
        <Profile state={state} dispatch={dispatch} profile={profile} onLogout={handleLogout} />
      )}

      {/* Global overlays */}
      {state.xpAnimation && (
        <XPPopup amount={state.xpAnimation.amount} onDone={clearXPAnimation} />
      )}
      {state.newBadge && (
        <BadgeModal badgeId={state.newBadge} onClose={clearBadgeModal} />
      )}
    </div>
  )
}
