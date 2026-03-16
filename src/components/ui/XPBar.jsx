import { XP_PER_LEVEL, getXPProgress, getLevelTitle, LEVEL_TITLES } from '../../store/gameReducer'

export default function XPBar({ xp, level, compact = false }) {
  const progress = getXPProgress(xp)
  const isMaxLevel = level >= LEVEL_TITLES.length
  const pct = isMaxLevel ? 100 : Math.round((progress / XP_PER_LEVEL) * 100)
  const { title, icon } = getLevelTitle(level)

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-brand-600">{icon} {title}</span>
        <div className="flex-1 h-2 bg-brand-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-xs text-gray-500">{isMaxLevel ? 'MAX' : `${progress}/${XP_PER_LEVEL}`}</span>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="font-bold text-brand-700">{icon} {title}</span>
        <span className="text-gray-500">{isMaxLevel ? 'Niveau max !' : `${progress} / ${XP_PER_LEVEL} XP`}</span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
