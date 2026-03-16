import { BADGES, getLevelFromXP, XP_PER_LEVEL, getXPProgress } from '../store/gameReducer'
import { MODULES } from '../data/modules'
import XPBar from './ui/XPBar'

export default function Profile({ state, dispatch, profile, onLogout }) {
  const { user } = state

  const totalLessons = MODULES.flatMap(m => m.lessons).length
  const completedLessons = user.completedLessons.length
  const nextLevel = user.level + 1
  const xpForNext = XP_PER_LEVEL - getXPProgress(user.xp)

  function handleReset() {
    if (window.confirm('Êtes-vous sûr de vouloir réinitialiser toute votre progression ?')) {
      localStorage.removeItem(`negomaster_${profile.id}`)
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => dispatch({ type: 'NAVIGATE', payload: 'dashboard' })}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← Retour
          </button>
          <h1 className="font-display font-black text-lg text-gray-900">Mon Profil</h1>
          <button
            onClick={onLogout}
            className="ml-auto text-sm text-gray-400 hover:text-gray-600 transition-colors px-3 py-1.5 rounded-xl hover:bg-gray-100"
          >
            Changer de profil
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Avatar / Name */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-4">
          <div className={`w-16 h-16 bg-gradient-to-br ${profile.color} rounded-2xl flex items-center justify-center text-white font-display font-black text-3xl`}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="font-display font-black text-xl text-gray-900">{user.name}</h2>
              {profile.role === 'admin' && (
                <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded-full">Admin</span>
              )}
            </div>
            <p className="text-sm text-gray-500">Négociateur B2B · Niveau {user.level}</p>
          </div>
        </div>

        {/* XP & Niveau */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
          <h3 className="font-bold text-gray-900">Progression</h3>
          <XPBar xp={user.xp} level={user.level} />
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-brand-50 rounded-xl p-3">
              <div className="font-display font-black text-2xl text-brand-700">{user.xp.toLocaleString()}</div>
              <div className="text-xs text-gray-500">XP Total</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-3">
              <div className="font-display font-black text-2xl text-amber-600">{xpForNext}</div>
              <div className="text-xs text-gray-500">XP pour niveau {nextLevel}</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
          <h3 className="font-bold text-gray-900">Statistiques</h3>
          <div className="grid grid-cols-2 gap-3">
            <StatItem icon="🔥" label="Meilleure série" value={`${user.streak} jour${user.streak > 1 ? 's' : ''}`} />
            <StatItem icon="🎓" label="Leçons terminées" value={`${completedLessons}/${totalLessons}`} />
            <StatItem icon="🏆" label="Badges obtenus" value={`${user.earnedBadges.length}/${BADGES.length}`} />
            <StatItem icon="❤️" label="Cœurs restants" value={`${user.hearts}/5`} />
          </div>
        </div>

        {/* Module progress */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
          <h3 className="font-bold text-gray-900">Modules</h3>
          {MODULES.map(module => {
            const done = module.lessons.filter(l => user.completedLessons.includes(l.id)).length
            const total = module.lessons.length
            const pct = total > 0 ? Math.round((done / total) * 100) : 0

            return (
              <div key={module.id} className={`rounded-xl p-3 ${module.locked ? 'opacity-50' : ''}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span>{module.icon}</span>
                  <span className="text-sm font-semibold text-gray-700">{module.title}</span>
                  <span className="ml-auto text-xs text-gray-400">{module.locked ? '🔒' : `${done}/${total}`}</span>
                </div>
                {!module.locked && (
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${module.color} rounded-full transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Badges */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
          <h3 className="font-bold text-gray-900">Badges</h3>
          <div className="grid grid-cols-3 gap-3">
            {BADGES.map(badge => {
              const earned = user.earnedBadges.includes(badge.id)
              return (
                <div
                  key={badge.id}
                  className={`rounded-xl p-3 text-center transition-all ${
                    earned
                      ? 'bg-gradient-to-br from-amber-50 to-yellow-100 border border-amber-200'
                      : 'bg-gray-50 border border-gray-200 opacity-40 grayscale'
                  }`}
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <p className={`text-xs font-bold ${earned ? 'text-amber-800' : 'text-gray-400'}`}>
                    {badge.label}
                  </p>
                  {!earned && (
                    <p className="text-xs text-gray-400 mt-0.5 leading-tight">{badge.desc}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Reset */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <h3 className="font-bold text-gray-900 mb-2">Zone dangereuse</h3>
          <p className="text-sm text-gray-500 mb-3">Réinitialiser toute la progression. Cette action est irréversible.</p>
          <button
            onClick={handleReset}
            className="bg-red-50 hover:bg-red-100 text-red-600 font-medium text-sm px-4 py-2 rounded-xl transition-colors border border-red-200"
          >
            Réinitialiser la progression
          </button>
        </div>

        <div className="h-8" />
      </main>
    </div>
  )
}

function StatItem({ icon, label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3">
      <div className="text-xl mb-1">{icon}</div>
      <div className="font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  )
}
