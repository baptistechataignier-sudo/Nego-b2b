import { useState } from 'react'
import { FeedbackBanner } from './MCQExercise'

// Ordering exercise: user clicks items in the correct order
export default function OrderingExercise({ exercise, onAnswer }) {
  const [shuffled] = useState(() => {
    const items = [...exercise.items]
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]]
    }
    return items
  })

  const [userOrder, setUserOrder] = useState([]) // array of item ids
  const [confirmed, setConfirmed] = useState(false)

  const remaining = shuffled.filter(item => !userOrder.includes(item.id))
  const isCorrect = confirmed && JSON.stringify(userOrder) === JSON.stringify(exercise.correct)

  function handleSelect(id) {
    if (confirmed) return
    setUserOrder(prev => [...prev, id])
  }

  function handleRemove(id) {
    if (confirmed) return
    setUserOrder(prev => prev.filter(x => x !== id))
  }

  function handleConfirm() {
    if (userOrder.length < exercise.items.length) return
    setConfirmed(true)
    onAnswer({ correct: isCorrect, xpGained: isCorrect ? exercise.xp : 0 })
  }

  return (
    <div className="animate-slide-up space-y-5">
      <div className="space-y-1">
        <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Exercice d'ordonnancement</p>
        <p className="font-semibold text-gray-900">{exercise.instruction}</p>
        <p className="text-xs text-gray-400">+{exercise.xp} XP si correct</p>
      </div>

      {/* User's built sequence */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-gray-500">Votre ordre :</p>
        <div className="min-h-[60px] border-2 border-dashed border-indigo-200 rounded-xl p-2 space-y-2">
          {userOrder.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-2">Cliquez sur les étapes ci-dessous dans l'ordre</p>
          )}
          {userOrder.map((id, idx) => {
            const item = exercise.items.find(i => i.id === id)
            const correctIdx = exercise.correct.indexOf(id)
            const isRight = confirmed && correctIdx === idx
            const isWrong = confirmed && correctIdx !== idx

            return (
              <button
                key={id}
                onClick={() => handleRemove(id)}
                disabled={confirmed}
                className={`w-full flex items-center gap-2 p-3 rounded-xl text-sm text-left transition-all border-2 ${
                  confirmed
                    ? isRight
                      ? 'border-success bg-success-light text-green-800'
                      : 'border-danger bg-danger-light text-red-800'
                    : 'border-indigo-200 bg-indigo-50 text-indigo-900 hover:border-red-300'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  confirmed ? (isRight ? 'bg-success text-white' : 'bg-danger text-white') : 'bg-indigo-600 text-white'
                }`}>
                  {confirmed ? (isRight ? '✓' : '✗') : idx + 1}
                </span>
                <span>{item?.text}</span>
                {!confirmed && <span className="ml-auto text-gray-400 text-xs">Retirer ×</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Remaining items to place */}
      {!confirmed && remaining.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-gray-500">Étapes disponibles :</p>
          <div className="space-y-2">
            {remaining.map(item => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className="w-full flex items-center gap-2 p-3 rounded-xl text-sm text-left border-2 border-gray-200 bg-white text-gray-700 hover:border-indigo-400 hover:bg-indigo-50 transition-all"
              >
                <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xs font-bold">
                  ?
                </span>
                {item.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Feedback */}
      {confirmed && (
        <div>
          {isCorrect ? (
            <FeedbackBanner correct={true} explanation="🎯 Parfait ! Vous maîtrisez l'ordre des étapes." />
          ) : (
            <div className="bg-danger-light border border-danger rounded-2xl p-4 animate-bounce-in">
              <p className="font-bold text-red-800 mb-1">❌ L'ordre n'était pas tout à fait bon</p>
              <p className="text-sm text-red-700 mb-2">L'ordre correct est :</p>
              {exercise.correct.map((id, idx) => {
                const item = exercise.items.find(i => i.id === id)
                return (
                  <div key={id} className="flex items-center gap-2 text-sm text-red-700 py-1">
                    <span className="w-5 h-5 bg-red-200 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{idx + 1}</span>
                    {item?.text}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* CTA */}
      {!confirmed ? (
        <button
          onClick={handleConfirm}
          disabled={userOrder.length < exercise.items.length}
          className={`w-full font-bold py-4 rounded-2xl transition-all text-lg ${
            userOrder.length >= exercise.items.length
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Vérifier l'ordre
        </button>
      ) : (
        <button
          onClick={() => onAnswer({ correct: isCorrect, xpGained: isCorrect ? exercise.xp : 0, done: true })}
          className={`w-full font-bold py-4 rounded-2xl transition-all text-lg active:scale-95 ${
            isCorrect ? 'bg-success text-white hover:bg-green-600' : 'bg-brand-600 text-white hover:bg-brand-700'
          }`}
        >
          Continuer →
        </button>
      )}
    </div>
  )
}
