import React from 'react'
import { BADGES } from '../data/badges.js'
import { computeUserLevel } from '../hooks/useProgress.js'
import { ALL_LEVELS, LEVEL_COLORS, getLevelProgress, getAllLessons } from '../data/levels.js'

export default function ProfileView({ state, dispatch }) {
  const { totalXP, streak, completedLessons, completedSimulations, earnedBadges, lessonScores } = state
  const { userLevel, title, next } = computeUserLevel(totalXP)
  const xpProgress = next ? Math.round((totalXP / next) * 100) : 100

  const allLessons = getAllLessons()
  const doneLessons = completedLessons.length

  function resetProgress() {
    if (window.confirm('Effacer toute la progression ? Cette action est irréversible.')) {
      localStorage.removeItem('negomaster_progress')
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white px-4 pt-10 pb-8">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => dispatch({ type: 'SET_VIEW', view: 'dashboard' })} className="text-brand-200 hover:text-white">← Retour</button>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl mx-auto mb-3">🤝</div>
            <h2 className="text-2xl font-black">Mon Profil</h2>
            <p className="text-brand-200">{title} · Niveau {userLevel}</p>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-6 space-y-5">
        {/* XP Card */}
        <div className="card">
          <h3 className="font-black text-gray-900 mb-4">⭐ Progression</h3>
          <div className="flex justify-around mb-4">
            {[
              { value: totalXP, label: 'XP Total', icon: '⭐' },
              { value: streak, label: 'Streak', icon: '🔥' },
              { value: doneLessons, label: 'Leçons', icon: '📚' },
              { value: completedSimulations.length, label: 'Simulations', icon: '🎭' },
            ].map(({ value, label, icon }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-black text-gray-900">{value}</div>
                <div className="text-xs text-gray-400">{icon} {label}</div>
              </div>
            ))}
          </div>
          <div className="mb-1">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Niveau {userLevel} — {title}</span>
              {next && <span>{totalXP} / {next} XP</span>}
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${xpProgress}%` }} />
            </div>
          </div>
        </div>

        {/* Parcours */}
        <div className="card">
          <h3 className="font-black text-gray-900 mb-3">📚 Parcours</h3>
          <div className="space-y-2">
            {ALL_LEVELS.map((lvl) => {
              const colors = LEVEL_COLORS[lvl.id]
              const { done, total, pct } = getLevelProgress(lvl, completedLessons)
              return (
                <div key={lvl.id} className={`flex items-center gap-3 p-3 rounded-xl ${colors.light}`}>
                  <span className="text-xl">{lvl.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-700">Niveau {lvl.id} — {lvl.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-white/60 rounded-full overflow-hidden">
                        <div className={`h-full ${colors.fill} rounded-full`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-gray-400">{done}/{total}</span>
                    </div>
                  </div>
                  {pct === 100 && <span className={`${colors.text} font-bold`}>✓</span>}
                </div>
              )
            })}
          </div>
        </div>

        {/* Badges */}
        <div className="card">
          <h3 className="font-black text-gray-900 mb-3">🏅 Badges ({earnedBadges.length}/{BADGES.length})</h3>
          <div className="grid grid-cols-4 gap-3">
            {BADGES.map(badge => {
              const earned = earnedBadges.includes(badge.id)
              return (
                <div key={badge.id} className={`flex flex-col items-center gap-1 transition-all ${earned ? '' : 'opacity-30 grayscale'}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${earned ? 'bg-brand-100' : 'bg-gray-100'}`}>
                    {badge.icon}
                  </div>
                  <span className="text-xs text-gray-500 text-center leading-tight font-medium">{badge.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Best scores */}
        {Object.keys(lessonScores).length > 0 && (
          <div className="card">
            <h3 className="font-black text-gray-900 mb-3">📊 Scores par leçon</h3>
            <div className="space-y-2">
              {Object.entries(lessonScores).map(([id, data]) => {
                const lesson = allLessons.find(l => l.id === id)
                if (!lesson) return null
                const pct = Math.round((data.score / data.maxScore) * 100)
                return (
                  <div key={id} className="flex items-center gap-3">
                    <span className="text-lg">{lesson.icon}</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-0.5">
                        <span className="text-gray-600 font-medium truncate">{lesson.title}</span>
                        <span className={`font-bold ${pct >= 80 ? 'text-brand-600' : pct >= 60 ? 'text-blue-600' : 'text-orange-500'}`}>{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${pct >= 80 ? 'bg-brand-500' : pct >= 60 ? 'bg-blue-500' : 'bg-orange-400'}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{data.attempts}x</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Reset */}
        <button onClick={resetProgress} className="w-full text-center text-xs text-gray-300 py-4 hover:text-red-400 transition-colors">
          Réinitialiser la progression
        </button>
      </div>
    </div>
  )
}
