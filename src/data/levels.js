import { LEVEL1 } from './level1.js'
import { LEVEL2 } from './level2.js'
import { LEVEL3 } from './level3.js'

export { LEVEL1, LEVEL2, LEVEL3 }

export const ALL_LEVELS = [LEVEL1, LEVEL2, LEVEL3]

export const LEVEL_COLORS = {
  1: { bg: 'bg-brand-100', text: 'text-brand-700', border: 'border-brand-200', fill: 'bg-brand-500', light: 'bg-brand-50', badge: 'bg-brand-100 text-brand-700' },
  2: { bg: 'bg-blue-100',  text: 'text-blue-700',  border: 'border-blue-200',  fill: 'bg-blue-500',  light: 'bg-blue-50',  badge: 'bg-blue-100 text-blue-700'  },
  3: { bg: 'bg-purple-100',text: 'text-purple-700',border: 'border-purple-200',fill: 'bg-purple-500',light: 'bg-purple-50',badge: 'bg-purple-100 text-purple-700'},
}

/** All lessons across every level as a flat array */
export function getAllLessons() {
  return ALL_LEVELS.flatMap(lvl =>
    lvl.modules.flatMap(mod =>
      mod.lessons.map(lesson => ({ ...lesson, moduleId: mod.id, levelId: lvl.id }))
    )
  )
}

/** Find which level + module contains a given lesson */
export function findLesson(moduleId, lessonId) {
  for (const lvl of ALL_LEVELS) {
    for (const mod of lvl.modules) {
      if (mod.id === moduleId) {
        for (const lesson of mod.lessons) {
          if (lesson.id === lessonId) return { lvl, mod, lesson }
        }
      }
    }
  }
  return null
}

/** Returns the course level (1/2/3) unlocked for a given progression state */
export function getUnlockedCourseLevel(completedLessons) {
  const l1Lessons = LEVEL1.modules.flatMap(m => m.lessons).map(l => l.id)
  const l2Lessons = LEVEL2.modules.flatMap(m => m.lessons).map(l => l.id)
  const l1Done = l1Lessons.every(id => completedLessons.includes(id))
  const l2Done = l2Lessons.every(id => completedLessons.includes(id))
  if (l2Done) return 3
  if (l1Done) return 2
  return 1
}

/** Progress percentage for a given course level */
export function getLevelProgress(lvl, completedLessons) {
  const lessons = lvl.modules.flatMap(m => m.lessons)
  const done = lessons.filter(l => completedLessons.includes(l.id)).length
  return { done, total: lessons.length, pct: lessons.length ? Math.round((done / lessons.length) * 100) : 0 }
}
