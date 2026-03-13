import { useState } from 'react'

export default function MCQExercise({ exercise, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  const correct = exercise.correct
  const isCorrect = selected === correct

  function handleSelect(idx) {
    if (confirmed) return
    setSelected(idx)
  }

  function handleConfirm() {
    if (selected === null) return
    setConfirmed(true)
    onAnswer({ correct: isCorrect, xpGained: isCorrect ? exercise.xp : 0 })
  }

  return (
    <div className="animate-slide-up space-y-5">
      {/* Question */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-brand-600 uppercase tracking-widest">Question</p>
        <p className="text-lg font-semibold text-gray-900 leading-snug">{exercise.question}</p>
        <p className="text-xs text-gray-400">+{exercise.xp} XP si correct</p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {exercise.options.map((opt, idx) => (
          <OptionButton
            key={idx}
            text={opt}
            idx={idx}
            selected={selected}
            confirmed={confirmed}
            correct={correct}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {/* Feedback */}
      {confirmed && (
        <FeedbackBanner correct={isCorrect} explanation={exercise.explanation} />
      )}

      {/* CTA */}
      {!confirmed ? (
        <button
          onClick={handleConfirm}
          disabled={selected === null}
          className={`w-full font-bold py-4 rounded-2xl transition-all text-lg ${
            selected !== null
              ? 'bg-brand-600 hover:bg-brand-700 text-white active:scale-95'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Vérifier
        </button>
      ) : (
        <button
          onClick={() => onAnswer({ correct: isCorrect, xpGained: isCorrect ? exercise.xp : 0, done: true })}
          className={`w-full font-bold py-4 rounded-2xl transition-all text-lg active:scale-95 ${
            isCorrect
              ? 'bg-success text-white hover:bg-green-600'
              : 'bg-danger text-white hover:bg-red-600'
          }`}
        >
          {isCorrect ? 'Continuer →' : 'Continuer quand même →'}
        </button>
      )}
    </div>
  )
}

function OptionButton({ text, idx, selected, confirmed, correct, onSelect }) {
  let style = 'border-2 border-gray-200 bg-white text-gray-700 hover:border-brand-400 hover:bg-brand-50'

  if (selected === idx && !confirmed) {
    style = 'border-2 border-brand-500 bg-brand-50 text-brand-900 font-semibold'
  } else if (confirmed) {
    if (idx === correct) {
      style = 'border-2 border-success bg-success-light text-green-800 font-semibold'
    } else if (idx === selected && idx !== correct) {
      style = 'border-2 border-danger bg-danger-light text-red-800 animate-shake'
    } else {
      style = 'border-2 border-gray-200 bg-gray-50 text-gray-400'
    }
  }

  const labels = ['A', 'B', 'C', 'D']

  return (
    <button
      onClick={() => onSelect(idx)}
      disabled={confirmed}
      className={`w-full flex items-start gap-3 p-4 rounded-xl text-left transition-all ${style}`}
    >
      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5 ${
        confirmed && idx === correct ? 'bg-success text-white' :
        confirmed && idx === selected ? 'bg-danger text-white' :
        selected === idx ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-500'
      }`}>
        {confirmed && idx === correct ? '✓' : confirmed && idx === selected && idx !== correct ? '✗' : labels[idx]}
      </span>
      <span className="text-sm leading-snug">{text}</span>
    </button>
  )
}

export function FeedbackBanner({ correct, explanation }) {
  return (
    <div className={`rounded-2xl p-4 animate-bounce-in ${correct ? 'bg-success-light border border-success' : 'bg-danger-light border border-danger'}`}>
      <p className={`font-bold mb-1 ${correct ? 'text-green-800' : 'text-red-800'}`}>
        {correct ? '🎉 Bonne réponse !' : '❌ Pas tout à fait...'}
      </p>
      <p className={`text-sm leading-relaxed ${correct ? 'text-green-700' : 'text-red-700'}`}>
        {explanation}
      </p>
    </div>
  )
}
