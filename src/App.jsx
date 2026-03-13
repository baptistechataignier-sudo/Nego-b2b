import React from 'react'
import { useProgress } from './hooks/useProgress.js'
import WelcomeScreen from './components/WelcomeScreen.jsx'
import PlacementTest from './components/PlacementTest.jsx'
import Dashboard from './components/Dashboard.jsx'
import LessonView from './components/LessonView.jsx'
import SimulationView from './components/SimulationView.jsx'
import ProfileView from './components/ProfileView.jsx'
import BadgeNotification from './components/BadgeNotification.jsx'

export default function App() {
  const { state, dispatch } = useProgress()
  const { currentView, currentLesson, currentSimulation, newBadges, placementDone } = state

  function handleDismissBadge() {
    dispatch({ type: 'CLEAR_NEW_BADGES' })
  }

  // Routing
  let screen
  switch (currentView) {
    case 'welcome':
      screen = (
        <WelcomeScreen
          hasSave={placementDone}
          onStart={() => dispatch({ type: 'SET_VIEW', view: 'placement' })}
          onContinue={() => dispatch({ type: 'SET_VIEW', view: 'dashboard' })}
        />
      )
      break

    case 'placement':
      screen = (
        <PlacementTest
          onComplete={({ level, answers }) => {
            dispatch({ type: 'COMPLETE_PLACEMENT', level, answers })
          }}
        />
      )
      break

    case 'dashboard':
      screen = <Dashboard state={state} dispatch={dispatch} />
      break

    case 'lesson':
      screen = currentLesson ? (
        <LessonView
          moduleId={currentLesson.moduleId}
          lessonId={currentLesson.lessonId}
          dispatch={dispatch}
        />
      ) : <Dashboard state={state} dispatch={dispatch} />
      break

    case 'simulation':
      screen = currentSimulation ? (
        <SimulationView simId={currentSimulation} dispatch={dispatch} />
      ) : <Dashboard state={state} dispatch={dispatch} />
      break

    case 'profile':
      screen = <ProfileView state={state} dispatch={dispatch} />
      break

    default:
      screen = <WelcomeScreen hasSave={false} onStart={() => dispatch({ type: 'SET_VIEW', view: 'placement' })} onContinue={() => {}} />
  }

  return (
    <>
      {screen}
      <BadgeNotification newBadges={newBadges} onDismiss={handleDismissBadge} />
    </>
  )
}
