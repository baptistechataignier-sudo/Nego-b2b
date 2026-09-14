import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { BADGES, getLevelFromXP, XP_PER_LEVEL, getXPProgress } from '../store/gameReducer'
import { MODULES } from '../data/modules'
import XPBar from './ui/XPBar'

const AVATAR_COLORS = [
  'from-brand-400 to-brand-600',
  'from-blue-400 to-indigo-600',
  'from-pink-400 to-rose-600',
  'from-green-400 to-emerald-600',
]

function getColor(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

export default function AdminDashboard({ profile, onLogout, dispatch }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => { fetchUsers() }, [])

  async function fetchUsers() {
    setLoading(true)

    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .eq('is_admin', false)

    const { data: progressRows } = await supabase
      .from('user_progress')
      .select('user_id, state')

    const progressMap = {}
    progressRows?.forEach(r => { progressMap[r.user_id] = r.state })

    setUsers((profiles || []).map(p => ({
      ...p,
      color: getColor(p.email),
      savedUser: progressMap[p.id]?.user ?? null,
    })))
    setLoading(false)
  }

  if (selectedUser) {
    return <UserDetail user={selectedUser} onBack={() => setSelectedUser(null)} onLogout={onLogout} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤝</span>
            <span className="font-display font-black text-xl text-brand-700">NégoMaster</span>
            <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded-full ml-1">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch({ type: 'NAVIGATE', payload: 'dashboard' })}
              className="text-sm text-gray-500 hover:text-brand-600 font-medium transition-colors px-3 py-1.5 rounded-xl hover:bg-brand-50"
            >
              Mon parcours
            </button>
            <button
              onClick={onLogout}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors px-3 py-1.5 rounded-xl hover:bg-gray-100"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="bg-gradient-to-br from-purple-50 to-violet-100 border border-purple-200 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-violet-600 rounded-xl flex items-center justify-center text-white font-display font-black text-xl">
              {profile.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-display font-black text-xl text-gray-900">Tableau de bord Admin</h2>
              <p className="text-sm text-purple-600">Progression de l'équipe en temps réel</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wide">
            Apprenants {!loading && `(${users.length})`}
          </h3>

          {loading && <p className="text-gray-400 text-sm text-center py-8">Chargement...</p>}

          {!loading && users.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-gray-400">
              <div className="text-3xl mb-3">👥</div>
              <p className="font-medium">Aucun apprenant connecté pour l'instant.</p>
              <p className="text-sm mt-1">Partagez l'URL de l'app avec votre équipe.</p>
            </div>
          )}

          {!loading && users.map(u => {
            const user = u.savedUser
            const xp = user?.xp ?? 0
            const level = getLevelFromXP(xp)
            const completedLessons = user?.completedLessons ?? []
            const earnedBadges = user?.earnedBadges ?? []
            const streak = user?.streak ?? 0
            const hearts = user?.hearts ?? 5
            const totalLessons = MODULES.flatMap(m => m.lessons).length
            const pct = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0

            return (
              <button
                key={u.id}
                onClick={() => setSelectedUser(u)}
                className="w-full bg-white border border-gray-200 hover:border-brand-400 hover:shadow-md rounded-2xl p-5 text-left transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${u.color} rounded-xl flex items-center justify-center text-white font-display font-black text-xl shrink-0`}>
                    {u.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="font-display font-black text-lg text-gray-900">{u.name}</div>
                    <div className="text-sm text-gray-500">Niveau {level} · {xp.toLocaleString()} XP</div>
                  </div>
                  <span className="text-gray-300 group-hover:text-brand-400 text-lg transition-colors">→</span>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progression globale</span>
                    <span>{completedLessons.length}/{totalLessons} leçons ({pct}%)</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${u.color} rounded-full transition-all`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-3 text-xs">
                  <span className="bg-orange-50 text-orange-600 px-2 py-1 rounded-lg font-semibold">🔥 {streak}j</span>
                  <span className="bg-amber-50 text-amber-600 px-2 py-1 rounded-lg font-semibold">🏆 {earnedBadges.length} badge{earnedBadges.length !== 1 ? 's' : ''}</span>
                  <span className="bg-red-50 text-red-500 px-2 py-1 rounded-lg font-semibold">❤️ {hearts}/5</span>
                  {user ? (
                    <span className="bg-green-50 text-green-600 px-2 py-1 rounded-lg font-semibold">✓ Actif</span>
                  ) : (
                    <span className="bg-gray-50 text-gray-400 px-2 py-1 rounded-lg font-semibold">Pas commencé</span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </main>
    </div>
  )
}

function UserDetail({ user, onBack }) {
  const saved = user.savedUser
  const userState = saved ?? { xp: 0, level: 1, streak: 0, completedLessons: [], earnedBadges: [], hearts: 5, completedModules: [] }
  const xp = userState.xp ?? 0
  const level = getLevelFromXP(xp)
  const totalLessons = MODULES.flatMap(m => m.lessons).length
  const xpForNext = XP_PER_LEVEL - getXPProgress(xp)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="text-gray-400 hover:text-gray-600 transition-colors">
            ← Retour
          </button>
          <h1 className="font-display font-black text-lg text-gray-900">Profil de {user.name}</h1>
          <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">Lecture seule</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-4">
          <div className={`w-16 h-16 bg-gradient-to-br ${user.color} rounded-2xl flex items-center justify-center text-white font-display font-black text-3xl`}>
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="font-display font-black text-xl text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">Négociateur B2B · Niveau {level}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
          <h3 className="font-bold text-gray-900">Progression</h3>
          <XPBar xp={xp} level={level} />
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-brand-50 rounded-xl p-3">
              <div className="font-display font-black text-2xl text-brand-700">{xp.toLocaleString()}</div>
              <div className="text-xs text-gray-500">XP Total</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-3">
              <div className="font-display font-black text-2xl text-amber-600">{xpForNext}</div>
              <div className="text-xs text-gray-500">XP pour niveau {level + 1}</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
          <h3 className="font-bold text-gray-900">Statistiques</h3>
          <div className="grid grid-cols-2 gap-3">
            <StatItem icon="🔥" label="Série" value={`${userState.streak ?? 0} jour${(userState.streak ?? 0) > 1 ? 's' : ''}`} />
            <StatItem icon="🎓" label="Leçons" value={`${userState.completedLessons?.length ?? 0}/${totalLessons}`} />
            <StatItem icon="🏆" label="Badges" value={`${userState.earnedBadges?.length ?? 0}/${BADGES.length}`} />
            <StatItem icon="❤️" label="Cœurs" value={`${userState.hearts ?? 5}/5`} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
          <h3 className="font-bold text-gray-900">Modules</h3>
          {MODULES.map(module => {
            const done = module.lessons.filter(l => (userState.completedLessons ?? []).includes(l.id)).length
            const total = module.lessons.length
            const pct = total > 0 ? Math.round((done / total) * 100) : 0
            return (
              <div key={module.id} className="rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span>{module.icon}</span>
                  <span className="text-sm font-semibold text-gray-700">{module.title}</span>
                  <span className="ml-auto text-xs text-gray-400">{done}/{total}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${module.color} rounded-full transition-all`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
          <h3 className="font-bold text-gray-900">Badges</h3>
          <div className="grid grid-cols-3 gap-3">
            {BADGES.map(badge => {
              const earned = (userState.earnedBadges ?? []).includes(badge.id)
              return (
                <div
                  key={badge.id}
                  className={`rounded-xl p-3 text-center ${
                    earned
                      ? 'bg-gradient-to-br from-amber-50 to-yellow-100 border border-amber-200'
                      : 'bg-gray-50 border border-gray-200 opacity-40 grayscale'
                  }`}
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <p className={`text-xs font-bold ${earned ? 'text-amber-800' : 'text-gray-400'}`}>{badge.label}</p>
                  {!earned && <p className="text-xs text-gray-400 mt-0.5 leading-tight">{badge.desc}</p>}
                </div>
              )
            })}
          </div>
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
