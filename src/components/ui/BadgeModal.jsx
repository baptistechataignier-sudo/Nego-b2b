import { BADGES } from '../../store/gameReducer'

export default function BadgeModal({ badgeId, onClose }) {
  const badge = BADGES.find(b => b.id === badgeId)
  if (!badge) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in" onClick={onClose}>
      <div
        className="bg-white rounded-3xl p-8 mx-4 max-w-sm w-full text-center shadow-2xl animate-bounce-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-6xl mb-4">{badge.icon}</div>
        <p className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-2">Nouveau Badge !</p>
        <h2 className="text-2xl font-display font-black text-gray-900 mb-2">{badge.label}</h2>
        <p className="text-gray-500 mb-6">{badge.desc}</p>
        <button
          onClick={onClose}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-2xl transition-colors"
        >
          Super ! 🎉
        </button>
      </div>
    </div>
  )
}
