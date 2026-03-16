import { useState } from 'react'

// Click-based matching: select left item, then right item to pair them
export default function MatchingExercise({ exercise, onAnswer }) {
  const [selectedLeft, setSelectedLeft] = useState(null)
  const [matched, setMatched] = useState({}) // leftIdx -> rightIdx
  const [wrongPair, setWrongPair] = useState(null)
  const [completed, setCompleted] = useState(false)
  const [mistakes, setMistakes] = useState(0)

  const pairs = exercise.pairs
  const total = pairs.length
  const matchedCount = Object.keys(matched).length

  // Shuffle right items display
  const [rightOrder] = useState(() => {
    const indices = pairs.map((_, i) => i)
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]]
    }
    return indices
  })

  function handleLeftClick(idx) {
    if (Object.keys(matched).map(Number).includes(idx)) return
    setSelectedLeft(idx)
    setWrongPair(null)
  }

  function handleRightClick(displayIdx) {
    const rightIdx = rightOrder[displayIdx]
    if (Object.values(matched).includes(rightIdx)) return
    if (selectedLeft === null) return

    if (rightIdx === selectedLeft) {
      // Correct match
      const newMatched = { ...matched, [selectedLeft]: rightIdx }
      setMatched(newMatched)
      setSelectedLeft(null)
      if (Object.keys(newMatched).length === total) {
        setCompleted(true)
        const xpGained = Math.max(0, exercise.xp - mistakes * 3)
        onAnswer({ correct: true, xpGained })
      }
    } else {
      // Wrong
      setWrongPair({ left: selectedLeft, right: displayIdx })
      setMistakes(m => m + 1)
      setSelectedLeft(null)
      onAnswer({ correct: false, xpGained: 0 })
      setTimeout(() => setWrongPair(null), 800)
    }
  }

  return (
    <div className="animate-slide-up space-y-5">
      <div className="space-y-1">
        <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">Exercice d'association</p>
        <p className="font-semibold text-gray-900">{exercise.instruction}</p>
        <p className="text-xs text-gray-400">+{exercise.xp} XP · {matchedCount}/{total} associés</p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2">
        {pairs.map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              Object.keys(matched).map(Number).includes(i) ? 'bg-success' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-2 gap-3">
        {/* Left column */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-gray-500 text-center mb-2">Situation</p>
          {pairs.map((pair, idx) => {
            const isMatched = Object.keys(matched).map(Number).includes(idx)
            const isSelected = selectedLeft === idx
            const isWrong = wrongPair?.left === idx

            return (
              <button
                key={idx}
                onClick={() => handleLeftClick(idx)}
                disabled={isMatched}
                className={`w-full p-3 rounded-xl text-sm text-left transition-all border-2 ${
                  isMatched
                    ? 'border-success bg-success-light text-green-800 opacity-60 cursor-default'
                    : isSelected
                    ? 'border-amber-500 bg-amber-50 text-amber-900 font-semibold'
                    : isWrong
                    ? 'border-danger bg-danger-light animate-shake'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-amber-400'
                }`}
              >
                {isMatched && <span className="mr-1">✅</span>}
                {pair.left}
              </button>
            )
          })}
        </div>

        {/* Right column (shuffled) */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-gray-500 text-center mb-2">Évaluation</p>
          {rightOrder.map((pairIdx, displayIdx) => {
            const isMatched = Object.values(matched).includes(pairIdx)
            const isWrong = wrongPair?.right === displayIdx

            return (
              <button
                key={displayIdx}
                onClick={() => handleRightClick(displayIdx)}
                disabled={isMatched || selectedLeft === null}
                className={`w-full p-3 rounded-xl text-sm text-left transition-all border-2 ${
                  isMatched
                    ? 'border-success bg-success-light text-green-800 opacity-60 cursor-default'
                    : isWrong
                    ? 'border-danger bg-danger-light animate-shake'
                    : selectedLeft !== null
                    ? 'border-brand-300 bg-brand-50 text-brand-900 hover:border-brand-500 cursor-pointer'
                    : 'border-gray-200 bg-white text-gray-500 cursor-not-allowed'
                }`}
              >
                {isMatched && <span className="mr-1">✅</span>}
                {pairs[pairIdx].right}
              </button>
            )
          })}
        </div>
      </div>

      {/* Hint */}
      {!completed && (
        <p className="text-xs text-gray-400 text-center">
          {selectedLeft !== null
            ? '👆 Maintenant cliquez sur la correspondance à droite'
            : '👆 Cliquez sur un élément à gauche pour commencer'}
        </p>
      )}

      {/* Done state */}
      {completed && (
        <div className="bg-success-light border border-success rounded-2xl p-4 animate-bounce-in">
          <p className="font-bold text-green-800 mb-1">🎉 Toutes les paires trouvées !</p>
          <p className="text-sm text-green-700">
            {mistakes === 0
              ? 'Parfait, sans aucune erreur !'
              : `${mistakes} erreur${mistakes > 1 ? 's' : ''}. Continuez à pratiquer !`}
          </p>
        </div>
      )}

      {completed && (
        <button
          onClick={() => onAnswer({ correct: true, xpGained: Math.max(0, exercise.xp - mistakes * 3), done: true })}
          className="w-full bg-success hover:bg-green-600 text-white font-bold py-4 rounded-2xl transition-all text-lg active:scale-95"
        >
          Continuer →
        </button>
      )}
    </div>
  )
}
