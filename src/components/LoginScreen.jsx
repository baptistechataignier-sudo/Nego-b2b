import { PROFILES, loadProfileState } from '../App'
import { getLevelFromXP, getLevelTitle } from '../store/gameReducer'

export default function LoginScreen({ onSelectProfile }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100 flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-3">🤝</div>
        <h1 className="font-display font-black text-4xl text-brand-700">NégoMaster</h1>
        <p className="text-gray-500 mt-2 text-sm">Choisissez votre profil pour continuer</p>
      </div>

      {/* Profile cards */}
      <div className="w-full max-w-sm space-y-4">
        {PROFILES.map(profile => {
          const saved = loadProfileState(profile.id)
          const xp = saved?.user?.xp ?? 0
          const level = getLevelFromXP(xp)
          const completedLessons = saved?.user?.completedLessons?.length ?? 0

          return (
            <button
              key={profile.id}
              onClick={() => onSelectProfile(profile.id)}
              className="w-full bg-white border-2 border-gray-200 hover:border-brand-400 hover:shadow-lg rounded-2xl p-5 flex items-center gap-4 transition-all text-left group"
            >
              {/* Avatar */}
              <div className={`w-14 h-14 bg-gradient-to-br ${profile.color} rounded-2xl flex items-center justify-center text-white font-display font-black text-2xl shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                {profile.name.charAt(0)}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-display font-black text-lg text-gray-900">{profile.name}</span>
                  {profile.role === 'admin' && (
                    <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded-full">Admin</span>
                  )}
                </div>
                {saved ? (
                  <p className="text-sm text-gray-500">
                    {getLevelTitle(level).icon} {getLevelTitle(level).title} · {xp.toLocaleString()} XP · {completedLessons} leçon{completedLessons > 1 ? 's' : ''}
                  </p>
                ) : (
                  <p className="text-sm text-gray-400">Nouveau — commencer</p>
                )}
              </div>

              <span className="text-gray-300 group-hover:text-brand-400 text-xl transition-colors">→</span>
            </button>
          )
        })}
      </div>

      <p className="text-xs text-gray-400 mt-10">NégoMaster B2B · Formation à la négociation commerciale</p>
    </div>
  )
}
