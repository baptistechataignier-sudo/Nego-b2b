// ─── XP & Level system ────────────────────────────────────────────────────────
export const XP_PER_LEVEL = 200
export const MAX_HEARTS = 5

export const LEVEL_TITLES = [
  { level: 1, title: 'Commercial Junior',   icon: '🌱', color: 'text-green-600'  },
  { level: 2, title: 'Commercial Confirmé', icon: '📈', color: 'text-blue-600'   },
  { level: 3, title: 'Key Account Manager', icon: '🎯', color: 'text-brand-600'  },
  { level: 4, title: 'Négociateur Senior',  icon: '⭐', color: 'text-amber-600'  },
  { level: 5, title: 'Expert Négociation',  icon: '🏆', color: 'text-purple-600' },
]

export function getLevelTitle(level) {
  return LEVEL_TITLES.find(t => t.level === level) || LEVEL_TITLES[LEVEL_TITLES.length - 1]
}

export function getLevelFromXP(xp) {
  return Math.min(Math.floor(xp / XP_PER_LEVEL) + 1, LEVEL_TITLES.length)
}

export function getXPProgress(xp) {
  const level = getLevelFromXP(xp)
  if (level >= LEVEL_TITLES.length) return XP_PER_LEVEL
  return xp % XP_PER_LEVEL
}

export function getXPForNextLevel(xp) {
  return XP_PER_LEVEL - (xp % XP_PER_LEVEL)
}

// ─── Badges definitions ───────────────────────────────────────────────────────
export const BADGES = [
  { id: 'first_lesson',   icon: '🎯', label: 'Premier Pas',       desc: 'Terminer sa première leçon',       xpReq: 0,   lessonsReq: 1  },
  { id: 'batna_master',   icon: '🛡️', label: 'Maître du BATNA',   desc: 'Réussir la leçon BATNA à 100%',   xpReq: 0,   specialId: 'batna' },
  { id: 'zopa_expert',    icon: '🎯', label: 'Expert ZOPA',        desc: 'Réussir la leçon ZOPA à 100%',    xpReq: 0,   specialId: 'zopa' },
  { id: 'xp_100',         icon: '⭐', label: 'Rookie',             desc: 'Atteindre 100 XP',                xpReq: 100, lessonsReq: 0  },
  { id: 'xp_500',         icon: '🌟', label: 'Négociateur',        desc: 'Atteindre 500 XP',                xpReq: 500, lessonsReq: 0  },
  { id: 'streak_3',       icon: '🔥', label: 'En Feu',             desc: '3 jours de suite',                streakReq: 3 },
  { id: 'streak_7',       icon: '🏆', label: 'Invaincu',           desc: '7 jours de suite',                streakReq: 7 },
  { id: 'fondamentaux',   icon: '🎓', label: 'Diplômé Fondamentaux', desc: 'Terminer le module Fondamentaux', moduleReq: 'fondamentaux' },
  { id: 'perfect_lesson', icon: '💎', label: 'Perfectionniste',    desc: 'Réussir une leçon sans faute',    specialId: 'perfect' },
]

// ─── Initial state ─────────────────────────────────────────────────────────────
export const initialState = {
  user: {
    name: 'Apprenant',
    xp: 0,
    level: 1,
    streak: 0,
    lastPlayed: null,
    completedLessons: [],   // lesson ids
    completedModules: [],   // module ids
    earnedBadges: [],       // badge ids
    hearts: MAX_HEARTS,
    heartLastRegen: null,
  },
  view: 'dashboard',        // dashboard | lesson | simulation | profile
  activeLesson: null,       // { moduleId, lessonId }
  activeSimulation: null,   // simulation id
  lessonSession: null,      // { exerciseIndex, mistakes, xpEarned, answers }
  xpAnimation: null,        // { amount } — triggers floating XP animation
  newBadge: null,           // badge id for modal
}

// ─── Reducer ───────────────────────────────────────────────────────────────────
export function gameReducer(state, action) {
  switch (action.type) {

    case 'NAVIGATE': {
      return { ...state, view: action.payload, activeLesson: null, lessonSession: null, activeSimulation: null }
    }

    case 'START_LESSON': {
      const { moduleId, lessonId } = action.payload
      return {
        ...state,
        view: 'lesson',
        activeLesson: { moduleId, lessonId },
        lessonSession: {
          exerciseIndex: 0,
          mistakes: 0,
          xpEarned: 0,
          answers: [],
          phase: 'playing', // playing | complete
        },
      }
    }

    case 'ANSWER_EXERCISE': {
      const { correct, xpGained, exerciseIndex } = action.payload
      const session = state.lessonSession
      const newMistakes = correct ? session.mistakes : session.mistakes + 1
      const newXP = session.xpEarned + (correct ? xpGained : 0)

      // Update hearts if wrong
      const newHearts = correct ? state.user.hearts : Math.max(0, state.user.hearts - 1)

      return {
        ...state,
        lessonSession: {
          ...session,
          mistakes: newMistakes,
          xpEarned: newXP,
          answers: [...session.answers, { exerciseIndex, correct }],
        },
        user: {
          ...state.user,
          hearts: newHearts,
        },
        xpAnimation: correct ? { amount: xpGained } : null,
      }
    }

    case 'NEXT_EXERCISE': {
      return {
        ...state,
        lessonSession: {
          ...state.lessonSession,
          exerciseIndex: state.lessonSession.exerciseIndex + 1,
        },
        xpAnimation: null,
      }
    }

    case 'COMPLETE_LESSON': {
      const { lessonId, moduleId, totalXP, perfect, allLessonIds } = action.payload
      const user = state.user

      const alreadyCompleted = user.completedLessons.includes(lessonId)
      const newXP = user.xp + (alreadyCompleted ? Math.floor(totalXP * 0.25) : totalXP)
      const newLevel = getLevelFromXP(newXP)

      const completedLessons = alreadyCompleted
        ? user.completedLessons
        : [...user.completedLessons, lessonId]

      // Check if module complete
      const moduleComplete = allLessonIds && allLessonIds.every(id => completedLessons.includes(id))
      const completedModules = moduleComplete && !user.completedModules.includes(moduleId)
        ? [...user.completedModules, moduleId]
        : user.completedModules

      // Streak update
      const today = new Date().toDateString()
      const yesterday = new Date(Date.now() - 86400000).toDateString()
      let newStreak = user.streak
      if (user.lastPlayed !== today) {
        newStreak = user.lastPlayed === yesterday ? user.streak + 1 : 1
      }

      // Badge check
      const newBadges = checkBadges({
        ...user,
        xp: newXP,
        completedLessons,
        completedModules,
        streak: newStreak,
        earnedBadges: user.earnedBadges,
      }, lessonId, perfect, moduleId, moduleComplete)

      const earnedBadges = [...user.earnedBadges, ...newBadges.map(b => b.id)]
      const newBadgeToShow = newBadges.length > 0 ? newBadges[0].id : null

      const newUser = {
        ...user,
        xp: newXP,
        level: newLevel,
        streak: newStreak,
        lastPlayed: today,
        completedLessons,
        completedModules,
        earnedBadges,
        hearts: Math.min(MAX_HEARTS, user.hearts + 1), // regen 1 heart on lesson complete
      }

      return {
        ...state,
        user: newUser,
        lessonSession: { ...state.lessonSession, phase: 'complete', xpEarned: newXP - user.xp },
        newBadge: newBadgeToShow,
      }
    }

    case 'CLEAR_BADGE_MODAL': {
      return { ...state, newBadge: null }
    }

    case 'CLEAR_XP_ANIMATION': {
      return { ...state, xpAnimation: null }
    }

    case 'START_SIMULATION': {
      return {
        ...state,
        view: 'simulation',
        activeSimulation: action.payload,
        activeLesson: null,
        lessonSession: null,
      }
    }

    case 'COMPLETE_SIMULATION': {
      const { xpGained } = action.payload
      const newXP = state.user.xp + xpGained
      return {
        ...state,
        user: {
          ...state.user,
          xp: newXP,
          level: getLevelFromXP(newXP),
        },
        xpAnimation: { amount: xpGained },
      }
    }

    case 'UPDATE_USERNAME': {
      return { ...state, user: { ...state.user, name: action.payload } }
    }

    case 'REGEN_HEARTS': {
      return { ...state, user: { ...state.user, hearts: MAX_HEARTS } }
    }

    case 'LOAD_STATE': {
      return { ...initialState, ...action.payload }
    }

    default:
      return state
  }
}

// ─── Badge checker helper ─────────────────────────────────────────────────────
function checkBadges(user, lessonId, perfect, moduleId, moduleComplete) {
  const earned = []
  const already = user.earnedBadges || []

  for (const badge of BADGES) {
    if (already.includes(badge.id)) continue

    if (badge.xpReq && user.xp >= badge.xpReq) { earned.push(badge); continue }
    if (badge.lessonsReq && user.completedLessons.length >= badge.lessonsReq) { earned.push(badge); continue }
    if (badge.streakReq && user.streak >= badge.streakReq) { earned.push(badge); continue }
    if (badge.moduleReq && moduleComplete && moduleId === badge.moduleReq) { earned.push(badge); continue }
    if (badge.specialId === lessonId) { earned.push(badge); continue }
    if (badge.specialId === 'perfect' && perfect) { earned.push(badge); continue }
  }

  return earned
}
