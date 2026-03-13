import { MODULES, SIMULATIONS } from '../data/modules'
import XPBar from './ui/XPBar'

export default function Dashboard({ state, dispatch }) {
  const { user } = state

  const totalLessons = MODULES.flatMap(m => m.lessons).length
  const completedCount = user.completedLessons.length
  const globalPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

  function startLesson(moduleId, lessonId) {
    dispatch({ type: 'START_LESSON', payload: { moduleId, lessonId } })
  }

  function startSimulation(simId) {
    dispatch({ type: 'START_SIMULATION', payload: simId })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Header ────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤝</span>
              <span className="font-display font-black text-xl text-brand-700">NégoMaster</span>
            </div>
            <div className="flex items-center gap-3">
              {/* Streak */}
              <div className="flex items-center gap-1 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-full">
                <span className="text-base">🔥</span>
                <span className="text-sm font-bold text-orange-600">{user.streak}</span>
              </div>
              {/* Hearts */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`text-sm ${i < user.hearts ? '' : 'opacity-20 grayscale'}`}>❤️</span>
                ))}
              </div>
              {/* Profile */}
              <button
                onClick={() => dispatch({ type: 'NAVIGATE', payload: 'profile' })}
                className="w-9 h-9 bg-brand-100 hover:bg-brand-200 rounded-full flex items-center justify-center transition-colors font-bold text-brand-700 text-sm"
              >
                {user.name.charAt(0).toUpperCase()}
              </button>
            </div>
          </div>

          {/* XP Bar */}
          <div className="mt-2">
            <XPBar xp={user.xp} level={user.level} compact />
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-8">

        {/* ── Hero / Welcome ─────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl p-6 text-white">
          <p className="text-brand-200 text-sm font-medium mb-1">
            {user.streak > 0 ? `🔥 ${user.streak} jour${user.streak > 1 ? 's' : ''} de suite !` : 'Bienvenue !'}
          </p>
          <h1 className="font-display font-black text-2xl mb-1">
            Bonjour, {user.name} 👋
          </h1>
          <p className="text-brand-200 text-sm mb-4">
            {completedCount === 0
              ? 'Commencez votre premier module !'
              : `${completedCount}/${totalLessons} leçons terminées · ${globalPct}% du parcours`}
          </p>
          {/* Global progress */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-brand-300">
              <span>Progression globale</span>
              <span>{globalPct}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-700"
                style={{ width: `${globalPct}%` }}
              />
            </div>
          </div>
        </section>

        {/* ── Modules ────────────────────────────────────────────────── */}
        <section>
          <h2 className="font-display font-black text-xl text-gray-900 mb-4">Modules</h2>
          <div className="space-y-4">
            {MODULES.map(module => (
              <ModuleCard
                key={module.id}
                module={module}
                completedLessons={user.completedLessons}
                onStartLesson={startLesson}
              />
            ))}
          </div>
        </section>

        {/* ── Simulations ────────────────────────────────────────────── */}
        <section>
          <h2 className="font-display font-black text-xl text-gray-900 mb-4">
            Simulations B2B
          </h2>
          <div className="space-y-3">
            {SIMULATIONS.map(sim => (
              <SimulationCard
                key={sim.id}
                sim={sim}
                onStart={() => startSimulation(sim.id)}
              />
            ))}
          </div>
        </section>

        {/* ── Stats rapides ──────────────────────────────────────────── */}
        <section>
          <h2 className="font-display font-black text-xl text-gray-900 mb-4">Vos stats</h2>
          <div className="grid grid-cols-3 gap-3">
            <StatCard icon="⭐" label="XP Total" value={user.xp.toLocaleString()} />
            <StatCard icon="🎓" label="Leçons" value={completedCount} />
            <StatCard icon="🏅" label="Badges" value={user.earnedBadges.length} />
          </div>
        </section>

        <div className="h-8" />
      </main>
    </div>
  )
}

// ── ModuleCard ───────────────────────────────────────────────────────────────
function ModuleCard({ module, completedLessons, onStartLesson }) {
  const moduleCompleted = module.lessons.filter(l => completedLessons.includes(l.id))
  const pct = module.lessons.length > 0
    ? Math.round((moduleCompleted.length / module.lessons.length) * 100)
    : 0

  if (module.locked) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-4 opacity-60">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl">
            {module.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-700">{module.title}</h3>
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Bientôt</span>
            </div>
            <p className="text-sm text-gray-400">{module.subtitle}</p>
          </div>
          <span className="text-gray-300 text-xl">🔒</span>
        </div>
      </div>
    )
  }

  // Find the next unlocked lesson (first incomplete)
  const nextLesson = module.lessons.find(l => !completedLessons.includes(l.id))

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Module header */}
      <div className={`bg-gradient-to-r ${module.color} p-4 text-white`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
            {module.icon}
          </div>
          <div className="flex-1">
            <h3 className="font-display font-black text-lg">{module.title}</h3>
            <p className="text-white/80 text-sm">{module.subtitle}</p>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg">{pct}%</div>
            <div className="text-white/70 text-xs">{moduleCompleted.length}/{module.lessons.length}</div>
          </div>
        </div>
        {/* Progress */}
        <div className="mt-3 h-2 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Lessons list */}
      <div className="p-3 space-y-2">
        {module.lessons.map((lesson, idx) => {
          const done = completedLessons.includes(lesson.id)
          const isNext = !done && lesson.id === nextLesson?.id
          const locked = !done && idx > 0 && !completedLessons.includes(module.lessons[idx - 1]?.id)

          return (
            <LessonRow
              key={lesson.id}
              lesson={lesson}
              done={done}
              isNext={isNext}
              locked={locked}
              onStart={() => onStartLesson(module.id, lesson.id)}
            />
          )
        })}
      </div>
    </div>
  )
}

function LessonRow({ lesson, done, isNext, locked, onStart }) {
  return (
    <button
      onClick={locked ? undefined : onStart}
      disabled={locked}
      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
        locked
          ? 'opacity-40 cursor-not-allowed'
          : isNext
          ? 'bg-brand-50 border-2 border-brand-300 hover:bg-brand-100'
          : done
          ? 'bg-green-50 border border-green-200 hover:bg-green-100'
          : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
      }`}
    >
      {/* Icon */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
        done ? 'bg-green-100' : isNext ? 'bg-brand-100' : 'bg-gray-100'
      }`}>
        {done ? '✅' : locked ? '🔒' : lesson.icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`font-semibold text-sm ${done ? 'text-green-700' : isNext ? 'text-brand-700' : 'text-gray-600'}`}>
            {lesson.title}
          </span>
          {isNext && (
            <span className="text-xs bg-brand-600 text-white px-2 py-0.5 rounded-full font-bold">
              Continuer
            </span>
          )}
          {done && (
            <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full font-bold">
              Terminé
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400">{lesson.duration} · {lesson.xpReward} XP</p>
      </div>

      {/* Arrow */}
      {!locked && (
        <span className="text-gray-400 flex-shrink-0">›</span>
      )}
    </button>
  )
}

// ── SimulationCard ───────────────────────────────────────────────────────────
function SimulationCard({ sim, onStart }) {
  if (sim.locked) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-4 opacity-60">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{sim.icon}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">{sim.title}</span>
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Bientôt</span>
            </div>
            <p className="text-sm text-gray-400">{sim.subtitle}</p>
          </div>
          <span className="text-gray-300">🔒</span>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={onStart}
      className="w-full bg-white border border-gray-200 rounded-2xl p-4 text-left hover:border-brand-300 hover:shadow-md transition-all group"
    >
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 bg-gradient-to-br ${sim.color} rounded-2xl flex items-center justify-center text-2xl`}>
          {sim.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">{sim.title}</span>
            <DifficultyBadge level={sim.difficulty} />
          </div>
          <p className="text-sm text-gray-500">{sim.subtitle}</p>
          <p className="text-xs text-gray-400 mt-0.5">{sim.duration} · {sim.xpReward} XP</p>
        </div>
        <span className="text-brand-400 group-hover:text-brand-600 transition-colors text-xl">›</span>
      </div>
    </button>
  )
}

function DifficultyBadge({ level }) {
  const styles = {
    'Débutant': 'bg-green-100 text-green-700',
    'Intermédiaire': 'bg-yellow-100 text-yellow-700',
    'Expert': 'bg-red-100 text-red-700',
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[level] || 'bg-gray-100 text-gray-600'}`}>
      {level}
    </span>
  )
}

// ── StatCard ─────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="font-display font-black text-xl text-gray-900">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  )
}
