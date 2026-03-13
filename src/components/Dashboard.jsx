import React from 'react'
import { ALL_LEVELS, LEVEL_COLORS, getLevelProgress, getUnlockedCourseLevel } from '../data/levels.js'
import { SIMULATION_IT_RENOUVELLEMENT } from '../data/simulation.js'
import { BADGES } from '../data/badges.js'
import { computeUserLevel } from '../hooks/useProgress.js'

export default function Dashboard({ state, dispatch }) {
  const { totalXP, streak, completedLessons, completedModules, completedSimulations, earnedBadges } = state
  const { userLevel, title, next } = computeUserLevel(totalXP)
  const xpProgress = next ? Math.round((totalXP / next) * 100) : 100

  const unlockedCourseLevel = Math.max(
    state.placementLevel || 1,
    getUnlockedCourseLevel(completedLessons)
  )

  function startLesson(moduleId, lessonId) {
    dispatch({ type: 'START_LESSON', lesson: { moduleId, lessonId } })
  }

  function startSimulation(simId) {
    dispatch({ type: 'START_SIMULATION', simId })
  }

  const recentBadges = BADGES.filter(b => earnedBadges.includes(b.id)).slice(-3)

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white px-4 pt-10 pb-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-brand-200 text-sm font-medium">Bonjour, Négociateur !</p>
              <h1 className="text-2xl font-black">NégoMaster</h1>
            </div>
            <button onClick={() => dispatch({ type: 'SET_VIEW', view: 'profile' })} className="p-2 rounded-xl bg-white/20 hover:bg-white/30">
              👤
            </button>
          </div>

          {/* Stats row */}
          <div className="flex gap-3">
            <div className="flex-1 bg-white/15 rounded-xl p-3 text-center">
              <div className="text-2xl font-black">{totalXP}</div>
              <div className="text-xs text-brand-200">⭐ XP Total</div>
            </div>
            <div className="flex-1 bg-white/15 rounded-xl p-3 text-center">
              <div className="text-2xl font-black">{streak}</div>
              <div className="text-xs text-brand-200">🔥 Streak</div>
            </div>
            <div className="flex-1 bg-white/15 rounded-xl p-3 text-center">
              <div className="text-2xl font-black">{earnedBadges.length}</div>
              <div className="text-xs text-brand-200">🏅 Badges</div>
            </div>
          </div>

          {/* XP progress */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-brand-200 mb-1">
              <span>Niveau {userLevel} — {title}</span>
              {next && <span>{totalXP} / {next} XP</span>}
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all duration-700" style={{ width: `${xpProgress}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-6 space-y-6">

        {/* PARCOURS */}
        <section>
          <h2 className="text-lg font-black text-gray-900 mb-3">📚 Votre Parcours</h2>
          {ALL_LEVELS.map((lvl, lvlIdx) => {
            const colors = LEVEL_COLORS[lvl.id]
            const { done, total, pct } = getLevelProgress(lvl, completedLessons)
            const isUnlocked = lvl.id <= unlockedCourseLevel
            const prevLvl = ALL_LEVELS[lvlIdx - 1]
            const prevDone = prevLvl ? getLevelProgress(prevLvl, completedLessons).pct === 100 : true

            return (
              <LevelCard
                key={lvl.id}
                lvl={lvl}
                colors={colors}
                isUnlocked={isUnlocked}
                done={done}
                total={total}
                pct={pct}
                completedLessons={completedLessons}
                completedModules={completedModules}
                onStartLesson={startLesson}
              />
            )
          })}
        </section>

        {/* SIMULATIONS */}
        <section>
          <h2 className="text-lg font-black text-gray-900 mb-3">🎭 Simulations</h2>
          <SimCard
            sim={SIMULATION_IT_RENOUVELLEMENT}
            done={completedSimulations.includes(SIMULATION_IT_RENOUVELLEMENT.id)}
            bestScore={state.simScores[SIMULATION_IT_RENOUVELLEMENT.id]}
            onStart={() => startSimulation(SIMULATION_IT_RENOUVELLEMENT.id)}
          />
        </section>

        {/* BADGES */}
        {earnedBadges.length > 0 && (
          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">🏅 Badges Récents</h2>
            <div className="card">
              <div className="flex gap-3 flex-wrap">
                {recentBadges.map(b => (
                  <div key={b.id} className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center text-2xl">{b.icon}</div>
                    <span className="text-xs text-gray-500 font-medium text-center w-16 leading-tight">{b.label}</span>
                  </div>
                ))}
                {earnedBadges.length > 3 && (
                  <button onClick={() => dispatch({ type: 'SET_VIEW', view: 'profile' })} className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-sm font-bold text-gray-500">+{earnedBadges.length - 3}</div>
                    <span className="text-xs text-gray-400">Voir tout</span>
                  </button>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

function LevelCard({ lvl, colors, isUnlocked, done, total, pct, completedLessons, completedModules, onStartLesson }) {
  if (!isUnlocked) {
    return (
      <div className="card opacity-50 mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center text-2xl`}>🔒</div>
          <div>
            <h3 className="font-black text-gray-500">Niveau {lvl.id} — {lvl.title}</h3>
            <p className="text-xs text-gray-400">{lvl.unlockCondition}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card mb-4">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center text-2xl`}>{lvl.icon}</div>
        <div className="flex-1">
          <h3 className="font-black text-gray-900">Niveau {lvl.id} — {lvl.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 progress-bar">
              <div className={`h-full ${colors.fill} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
            </div>
            <span className="text-xs text-gray-400 font-semibold">{done}/{total}</span>
          </div>
        </div>
        {pct === 100 && <span className={`${colors.text} font-bold`}>✓</span>}
      </div>

      <div className="space-y-3">
        {lvl.modules.map((mod, mIdx) => {
          const modLessons = mod.lessons
          const modDone = modLessons.every(l => completedLessons.includes(l.id))
          const prevMod = lvl.modules[mIdx - 1]
          const prevModDone = mIdx === 0 || (prevMod && prevMod.lessons.every(l => completedLessons.includes(l.id)))
          const isLocked = !prevModDone && mIdx > 0

          return (
            <div key={mod.id} className={`rounded-xl border-2 overflow-hidden ${
              isLocked ? 'border-gray-100 bg-gray-50 opacity-60' :
              modDone ? `${colors.border} ${colors.light}` :
              'border-gray-200 bg-white'
            }`}>
              <div className="px-4 py-3 flex items-center gap-3">
                <span className="text-xl">{isLocked ? '🔒' : mod.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-sm">{mod.title}</p>
                  <p className="text-xs text-gray-400">{mod.lessons.length} leçon{mod.lessons.length > 1 ? 's' : ''}</p>
                </div>
                {modDone && <span className={`${colors.text} font-bold text-sm`}>✓</span>}
              </div>

              {!isLocked && (
                <div className="px-3 pb-3 space-y-2">
                  {modLessons.map((lesson, lIdx) => {
                    const prevLessonDone = lIdx === 0 || completedLessons.includes(modLessons[lIdx - 1].id)
                    const done = completedLessons.includes(lesson.id)
                    const locked = !prevLessonDone && lIdx > 0

                    return (
                      <button
                        key={lesson.id}
                        disabled={locked}
                        onClick={() => !locked && onStartLesson(mod.id, lesson.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 transition-all ${
                          locked ? 'opacity-40 cursor-not-allowed bg-gray-100' :
                          done ? `${colors.light} hover:opacity-80 cursor-pointer` :
                          'bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer'
                        }`}
                      >
                        <span className="text-lg">{locked ? '🔒' : done ? '✅' : lesson.icon}</span>
                        <div className="flex-1">
                          <p className={`text-sm font-semibold ${done ? colors.text : 'text-gray-700'}`}>
                            {lesson.title}
                          </p>
                        </div>
                        <span className="xp-badge">+{lesson.xpReward} XP</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SimCard({ sim, done, bestScore, onStart }) {
  const scoreLabel = done && bestScore !== undefined ? (
    bestScore >= 170 ? '🏆 Expert' :
    bestScore >= 120 ? '⭐ Confirmé' :
    bestScore >= 70 ? '📈 Junior' : '🌱 Débutant'
  ) : null

  return (
    <div className={`card border-2 ${done ? 'border-brand-200' : 'border-gray-200'}`}>
      <div className="flex items-start gap-3 mb-3">
        <div className="text-3xl">{sim.icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">{sim.sector}</span>
            <span className="text-xs bg-gray-100 text-gray-500 font-semibold px-2 py-0.5 rounded-full">{sim.duration}</span>
            {done && <span className="text-xs bg-brand-100 text-brand-700 font-bold px-2 py-0.5 rounded-full">✓ Terminé</span>}
          </div>
          <h3 className="font-black text-gray-900 mt-1">{sim.title}</h3>
          <p className="text-sm text-gray-500">{sim.subtitle}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="xp-badge">+{sim.xpReward} XP</span>
          {scoreLabel && <span className="text-sm font-bold text-gray-600">Meilleur : {scoreLabel}</span>}
        </div>
        <button className="btn-primary py-2 px-4 text-sm" onClick={onStart}>
          {done ? 'Rejouer' : 'Commencer'}
        </button>
      </div>
    </div>
  )
}
