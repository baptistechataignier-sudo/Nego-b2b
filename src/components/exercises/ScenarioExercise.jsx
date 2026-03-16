import { useState } from 'react'
import { FeedbackBanner } from './MCQExercise'

export default function ScenarioExercise({ exercise, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  const correct = exercise.correct
  const isCorrect = selected === correct

  function handleConfirm() {
    if (selected === null) return
    setConfirmed(true)
    onAnswer({ correct: isCorrect, xpGained: isCorrect ? exercise.xp : 0 })
  }

  return (
    <div className="animate-slide-up space-y-5">
      {/* Label */}
      <p className="text-xs font-bold text-purple-600 uppercase tracking-widest">Mise en situation</p>

      {/* Context */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm text-gray-700 leading-relaxed">
        <p className="font-medium text-gray-500 text-xs mb-2">📋 Contexte</p>
        {exercise.context}
      </div>

      {/* Dialogue bubble(s) */}
      <div className="space-y-3">
        {exercise.dialogue.map((line, i) => (
          <DialogueBubble key={i} line={line} />
        ))}
      </div>

      {/* Question */}
      <p className="font-semibold text-gray-900">{exercise.question}</p>
      <p className="text-xs text-gray-400">+{exercise.xp} XP si correct</p>

      {/* Options */}
      <div className="space-y-3">
        {exercise.options.map((opt, idx) => {
          let style = 'border-2 border-gray-200 bg-white text-gray-700 hover:border-purple-400 hover:bg-purple-50'
          if (selected === idx && !confirmed) {
            style = 'border-2 border-purple-500 bg-purple-50 text-purple-900 font-semibold'
          } else if (confirmed) {
            if (idx === correct) {
              style = 'border-2 border-success bg-success-light text-green-800 font-semibold'
            } else if (idx === selected && idx !== correct) {
              style = 'border-2 border-danger bg-danger-light text-red-800 animate-shake'
            } else {
              style = 'border-2 border-gray-200 bg-gray-50 text-gray-400'
            }
          }

          return (
            <button
              key={idx}
              onClick={() => !confirmed && setSelected(idx)}
              disabled={confirmed}
              className={`w-full flex items-start gap-3 p-4 rounded-xl text-left transition-all ${style}`}
            >
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                confirmed && idx === correct ? 'bg-success text-white' :
                confirmed && idx === selected ? 'bg-danger text-white' :
                selected === idx ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {confirmed && idx === correct ? '✓' : confirmed && idx === selected && idx !== correct ? '✗' : idx + 1}
              </span>
              <span className="text-sm leading-snug italic">"{opt}"</span>
            </button>
          )
        })}
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
              ? 'bg-purple-600 hover:bg-purple-700 text-white active:scale-95'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          C'est ma réponse
        </button>
      ) : (
        <button
          onClick={() => onAnswer({ correct: isCorrect, xpGained: isCorrect ? exercise.xp : 0, done: true })}
          className={`w-full font-bold py-4 rounded-2xl transition-all text-lg active:scale-95 ${
            isCorrect ? 'bg-success text-white hover:bg-green-600' : 'bg-danger text-white hover:bg-red-600'
          }`}
        >
          Continuer →
        </button>
      )}
    </div>
  )
}

function DialogueBubble({ line }) {
  const isAcheteur = line.speaker === 'acheteur'

  return (
    <div className={`flex items-start gap-3 ${isAcheteur ? '' : 'flex-row-reverse'}`}>
      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${
        isAcheteur ? 'bg-red-100' : 'bg-brand-100'
      }`}>
        {isAcheteur ? '👔' : '🤝'}
      </div>
      <div className={`max-w-xs lg:max-w-sm rounded-2xl px-4 py-3 text-sm leading-relaxed ${
        isAcheteur
          ? 'bg-gray-100 text-gray-800 rounded-tl-none'
          : 'bg-brand-600 text-white rounded-tr-none'
      }`}>
        <p className={`text-xs font-bold mb-1 ${isAcheteur ? 'text-gray-500' : 'text-brand-200'}`}>
          {isAcheteur ? 'Acheteur' : 'Vous'}
        </p>
        {line.text}
      </div>
    </div>
  )
}
