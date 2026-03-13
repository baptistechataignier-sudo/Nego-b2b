import { useReducer, useEffect, useCallback } from 'react'
import { gameReducer, initialState } from './store/gameReducer'
import Dashboard from './components/Dashboard'
import LessonView from './components/LessonView'
import Simulation from './components/Simulation'
import Profile from './components/Profile'
import XPPopup from './components/ui/XPPopup'
import BadgeModal from './components/ui/BadgeModal'

const STORAGE_KEY = 'negomaster_state'

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    // Merge with initialState to handle new fields from updates
    return {
      ...initialState,
      ...parsed,
      user: { ...initialState.user, ...parsed.user },
      // Always reset transient UI state on load
      view: parsed.view === 'lesson' || parsed.view === 'simulation' ? 'dashboard' : (parsed.view || 'dashboard'),
      activeLesson: null,
      lessonSession: null,
      activeSimulation: null,
      xpAnimation: null,
      newBadge: null,
    }
  } catch {
    return null
  }
}

export default function App() {
  const [state, dispatch] = useReducer(
    gameReducer,
    null,
    () => {
      const saved = loadState()
      return saved || initialState
    }
  )

  // Persist state to localStorage (only user data + view)
  useEffect(() => {
    const toSave = {
      user: state.user,
      view: state.view,
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
    } catch {
      // Storage full or disabled — ignore
    }
  }, [state.user, state.view])

  const clearXPAnimation = useCallback(
    () => dispatch({ type: 'CLEAR_XP_ANIMATION' }),
    []
  )

  const clearBadgeModal = useCallback(
    () => dispatch({ type: 'CLEAR_BADGE_MODAL' }),
    []
  )

  return (
    <div className="font-sans antialiased">
      {/* ── Main view router ─────────────────────────── */}
      {state.view === 'dashboard' && (
        <Dashboard state={state} dispatch={dispatch} />
      )}
      {state.view === 'lesson' && state.activeLesson && (
        <LessonView state={state} dispatch={dispatch} />
      )}
      {state.view === 'simulation' && state.activeSimulation && (
        <Simulation state={state} dispatch={dispatch} />
      )}
      {state.view === 'profile' && (
        <Profile state={state} dispatch={dispatch} />
      )}

      {/* ── Global overlays ──────────────────────────── */}
      {state.xpAnimation && (
        <XPPopup
          amount={state.xpAnimation.amount}
          onDone={clearXPAnimation}
        />
      )}
      {state.newBadge && (
        <BadgeModal
          badgeId={state.newBadge}
          onClose={clearBadgeModal}
        />
      )}
    </div>
  )
}
