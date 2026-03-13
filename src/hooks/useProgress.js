import { useReducer, useEffect } from 'react'
import { BADGES } from '../data/badges.js'

const STORAGE_KEY = 'negomaster_progress'

const INITIAL_STATE = {
  // Placement
  placementDone: false,
  placementLevel: null,

  // Current nav
  currentView: 'welcome', // welcome | placement | dashboard | lesson | simulation | profile
  currentLesson: null,    // { moduleId, lessonId }
  currentSimulation: null,

  // Progress
  level: 1,
  completedLessons: [],    // lessonIds
  completedModules: [],    // moduleIds
  completedSimulations: [],
  lessonScores: {},        // lessonId -> { score, maxScore, attempts }
  simScores: {},           // simId -> bestScore

  // Gamification
  totalXP: 0,
  streak: 0,
  lastPlayedDate: null,
  earnedBadges: [],        // badgeIds
  bestSimScore: 0,

  // UI state
  newBadges: [],           // badges just earned, for notification
}

function getToday() {
  return new Date().toISOString().split('T')[0]
}

function progressReducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return { ...INITIAL_STATE, ...action.payload }

    case 'SET_VIEW':
      return { ...state, currentView: action.view, newBadges: [] }

    case 'START_LESSON':
      return { ...state, currentView: 'lesson', currentLesson: action.lesson }

    case 'START_SIMULATION':
      return { ...state, currentView: 'simulation', currentSimulation: action.simId }

    case 'COMPLETE_PLACEMENT': {
      const { level, answers } = action
      return {
        ...state,
        placementDone: true,
        placementLevel: level,
        level,
        currentView: 'dashboard',
      }
    }

    case 'EARN_XP': {
      const newTotal = state.totalXP + action.amount
      const today = getToday()
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
      let newStreak = state.streak
      if (state.lastPlayedDate === yesterday) newStreak = state.streak + 1
      else if (state.lastPlayedDate !== today) newStreak = 1

      const newState = {
        ...state,
        totalXP: newTotal,
        streak: newStreak,
        lastPlayedDate: today,
      }
      return checkBadges(newState)
    }

    case 'COMPLETE_LESSON': {
      const { lessonId, moduleId, score, maxScore, xp } = action
      const alreadyDone = state.completedLessons.includes(lessonId)
      const newCompleted = alreadyDone
        ? state.completedLessons
        : [...state.completedLessons, lessonId]

      const prevScore = state.lessonScores[lessonId]?.score || 0
      const newScore = Math.max(prevScore, score)
      const newScores = {
        ...state.lessonScores,
        [lessonId]: { score: newScore, maxScore, attempts: (state.lessonScores[lessonId]?.attempts || 0) + 1 },
      }

      const newTotal = alreadyDone ? state.totalXP : state.totalXP + xp
      const today = getToday()
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
      let newStreak = state.streak
      if (state.lastPlayedDate === yesterday) newStreak = state.streak + 1
      else if (state.lastPlayedDate !== today) newStreak = 1

      const newState = {
        ...state,
        completedLessons: newCompleted,
        lessonScores: newScores,
        totalXP: newTotal,
        streak: newStreak,
        lastPlayedDate: today,
        currentView: 'dashboard',
        currentLesson: null,
      }
      return checkBadges(newState)
    }

    case 'COMPLETE_MODULE': {
      const { moduleId } = action
      const alreadyDone = state.completedModules.includes(moduleId)
      if (alreadyDone) return state
      const newState = {
        ...state,
        completedModules: [...state.completedModules, moduleId],
      }
      return checkBadges(newState)
    }

    case 'COMPLETE_SIMULATION': {
      const { simId, score, xp } = action
      const bestPrev = state.simScores[simId] || 0
      const bestScore = Math.max(bestPrev, score)
      const alreadyDone = state.completedSimulations.includes(simId)
      const newCompleted = alreadyDone
        ? state.completedSimulations
        : [...state.completedSimulations, simId]
      const newTotal = alreadyDone ? state.totalXP : state.totalXP + (score > bestPrev ? xp : 0)
      const today = getToday()
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
      let newStreak = state.streak
      if (state.lastPlayedDate === yesterday) newStreak = state.streak + 1
      else if (state.lastPlayedDate !== today) newStreak = 1

      const newState = {
        ...state,
        completedSimulations: newCompleted,
        simScores: { ...state.simScores, [simId]: bestScore },
        bestSimScore: Math.max(state.bestSimScore, bestScore),
        totalXP: newTotal,
        streak: newStreak,
        lastPlayedDate: today,
        currentView: 'dashboard',
        currentSimulation: null,
      }
      return checkBadges(newState)
    }

    case 'UNLOCK_LEVEL': {
      if (action.level <= state.level) return state
      const newState = { ...state, level: action.level }
      return checkBadges(newState)
    }

    case 'CLEAR_NEW_BADGES':
      return { ...state, newBadges: [] }

    default:
      return state
  }
}

function checkBadges(state) {
  const newlyEarned = []
  BADGES.forEach(badge => {
    if (!state.earnedBadges.includes(badge.id) && badge.condition(state)) {
      newlyEarned.push(badge.id)
    }
  })
  if (newlyEarned.length === 0) return state
  return {
    ...state,
    earnedBadges: [...state.earnedBadges, ...newlyEarned],
    newBadges: newlyEarned,
  }
}

export function useProgress() {
  const [state, dispatch] = useReducer(progressReducer, INITIAL_STATE)

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        dispatch({ type: 'HYDRATE', payload: JSON.parse(saved) })
      }
    } catch {}
  }, [])

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {}
  }, [state])

  return { state, dispatch }
}

export function computeUserLevel(totalXP) {
  if (totalXP < 100) return { userLevel: 1, title: 'Novice', next: 100 }
  if (totalXP < 300) return { userLevel: 2, title: 'Apprenti', next: 300 }
  if (totalXP < 600) return { userLevel: 3, title: 'Junior', next: 600 }
  if (totalXP < 1000) return { userLevel: 4, title: 'Confirmé', next: 1000 }
  if (totalXP < 1500) return { userLevel: 5, title: 'Expert', next: 1500 }
  return { userLevel: 6, title: 'Maître Négociateur', next: null }
}
