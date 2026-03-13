import React, { useState } from 'react'
import { LEVEL1 } from '../data/level1.js'

function findLesson(moduleId, lessonId) {
  for (const mod of LEVEL1.modules) {
    if (mod.id === moduleId) {
      for (const lesson of mod.lessons) {
        if (lesson.id === lessonId) return { mod, lesson }
      }
    }
  }
  return null
}

export default function LessonView({ moduleId, lessonId, dispatch }) {
  const found = findLesson(moduleId, lessonId)
  const [phase, setPhase] = useState('theory') // theory | exercises | complete
  const [exIdx, setExIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [reorderItems, setReorderItems] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [theoryPage, setTheoryPage] = useState(0)

  if (!found) return <div className="p-8 text-center text-gray-400">Leçon introuvable.</div>

  const { mod, lesson } = found
  const exercises = lesson.exercises
  const currentEx = exercises[exIdx]
  const maxScore = exercises.reduce((s, e) => s + (e.xp || 10), 0)

  function handleAnswer(idx) {
    if (showFeedback) return
    setSelected(idx)
    setShowFeedback(true)
    if (idx === currentEx.correct) {
      setScore(s => s + (currentEx.xp || 10))
    }
  }

  function handleReorderSubmit() {
    if (!reorderItems) return
    const userOrder = reorderItems
    const correct = currentEx.correct
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(correct)
    setShowFeedback(true)
    setSelected(isCorrect ? 'correct' : 'wrong')
    if (isCorrect) setScore(s => s + (currentEx.xp || 20))
  }

  function handleNext() {
    setShowFeedback(false)
    setSelected(null)
    setReorderItems(null)
    if (exIdx + 1 < exercises.length) {
      setExIdx(exIdx + 1)
    } else {
      setPhase('complete')
    }
  }

  function handleComplete() {
    dispatch({
      type: 'COMPLETE_LESSON',
      lessonId: lesson.id,
      moduleId: mod.id,
      score,
      maxScore,
      xp: lesson.xpReward,
    })
    // Check if module is done
    const allDone = mod.lessons.every(l => l.id === lesson.id || true)
    if (allDone) {
      dispatch({ type: 'COMPLETE_MODULE', moduleId: mod.id })
    }
  }

  const theory = lesson.theory

  // ── THEORY ──
  if (phase === 'theory') {
    const pages = theory.content
    const page = pages[theoryPage]
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <TopBar title={lesson.title} onBack={() => dispatch({ type: 'SET_VIEW', view: 'dashboard' })} progress={Math.round((theoryPage / (pages.length)) * 50)} label="Théorie" />

        <div className="flex-1 max-w-lg mx-auto w-full p-4">
          {/* Module badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">{mod.icon}</span>
            <span className="text-sm font-semibold text-gray-500">{mod.title}</span>
          </div>

          <h2 className="text-xl font-black text-gray-900 mb-5">{theory.title}</h2>

          {/* Page indicator */}
          <div className="flex gap-1.5 mb-5">
            {pages.map((_, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= theoryPage ? 'bg-brand-500' : 'bg-gray-200'}`} />
            ))}
          </div>

          <div className="card animate-pop">
            <h3 className="font-black text-gray-900 text-lg mb-3">{page.heading}</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-4 whitespace-pre-line">{page.body}</p>
            {page.example && (
              <div className="bg-brand-50 border-l-4 border-brand-400 rounded-r-xl p-3">
                <p className="text-xs font-bold text-brand-600 uppercase mb-1">Exemple concret</p>
                <p className="text-sm text-brand-900 leading-relaxed whitespace-pre-line">{page.example}</p>
              </div>
            )}
          </div>

          <div className="mt-6 flex gap-3">
            {theoryPage > 0 && (
              <button className="btn-secondary flex-1" onClick={() => setTheoryPage(t => t - 1)}>← Précédent</button>
            )}
            {theoryPage < pages.length - 1 ? (
              <button className="btn-primary flex-1" onClick={() => setTheoryPage(t => t + 1)}>Suivant →</button>
            ) : (
              <button className="btn-primary flex-1" onClick={() => setPhase('exercises')}>
                Pratiquer maintenant ! 🎯
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── COMPLETE ──
  if (phase === 'complete') {
    const pct = Math.round((score / maxScore) * 100)
    const perf = pct >= 80 ? { icon: '🏆', label: 'Excellent !', color: 'text-brand-600', bg: 'bg-brand-50' } :
                 pct >= 60 ? { icon: '⭐', label: 'Bien joué !', color: 'text-blue-600', bg: 'bg-blue-50' } :
                 { icon: '📈', label: 'Continuez !', color: 'text-orange-600', bg: 'bg-orange-50' }
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center animate-pop">
          <div className="text-6xl mb-3 animate-bounce-in">{perf.icon}</div>
          <h2 className="text-2xl font-black text-gray-900 mb-1">Leçon terminée !</h2>
          <p className="text-gray-400 text-sm mb-5">{lesson.title}</p>

          <div className={`${perf.bg} rounded-2xl p-5 mb-5`}>
            <p className={`text-3xl font-black ${perf.color}`}>{pct}%</p>
            <p className={`text-sm font-semibold ${perf.color}`}>{perf.label}</p>
            <div className="mt-3 flex justify-center gap-4 text-sm text-gray-500">
              <span>Score : {score}/{maxScore}</span>
              <span>·</span>
              <span className="xp-badge">+{lesson.xpReward} XP</span>
            </div>
          </div>

          <div className="progress-bar mb-5">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>

          <button className="btn-primary w-full" onClick={handleComplete}>
            Retour au parcours 🏠
          </button>
        </div>
      </div>
    )
  }

  // ── EXERCISES ──
  const exProgress = Math.round(50 + (exIdx / exercises.length) * 50)
  const isCorrect = currentEx.type !== 'reorder'
    ? selected === currentEx.correct
    : selected === 'correct'

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopBar
        title={lesson.title}
        onBack={() => dispatch({ type: 'SET_VIEW', view: 'dashboard' })}
        progress={exProgress}
        label={`${exIdx + 1}/${exercises.length}`}
      />

      <div className="flex-1 max-w-lg mx-auto w-full p-4">
        {/* Exercise type badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
            currentEx.type === 'dialogue' ? 'bg-purple-100 text-purple-700' :
            currentEx.type === 'reorder' ? 'bg-orange-100 text-orange-700' :
            currentEx.type === 'vrai_faux' ? 'bg-yellow-100 text-yellow-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {currentEx.type === 'qcm' ? '📋 QCM' :
             currentEx.type === 'dialogue' ? '💬 Dialogue' :
             currentEx.type === 'reorder' ? '🔀 Remise en ordre' :
             '✅ Vrai / Faux'}
          </span>
          <span className="xp-badge">+{currentEx.xp || 10} XP</span>
        </div>

        {/* Dialogue context */}
        {currentEx.type === 'dialogue' && (
          <div className="bg-gray-800 text-white rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🎭</span>
              <span className="text-xs font-bold text-gray-300 uppercase">Mise en scène</span>
            </div>
            <p className="text-sm text-gray-200 mb-2">{currentEx.situation}</p>
            <div className="flex gap-3 text-xs text-gray-400">
              <span>🟢 Vous : {currentEx.yourRole}</span>
              <span>🔴 {currentEx.buyerRole}</span>
            </div>
          </div>
        )}

        {/* Reorder context */}
        {currentEx.type === 'reorder' && (
          <ReorderExercise
            exercise={currentEx}
            reorderItems={reorderItems}
            setReorderItems={setReorderItems}
            showFeedback={showFeedback}
            onSubmit={handleReorderSubmit}
          />
        )}

        {/* Question */}
        {currentEx.type !== 'reorder' && (
          <>
            <h3 className="text-lg font-bold text-gray-900 mb-5 leading-snug">{currentEx.question}</h3>
            <div className="space-y-3">
              {currentEx.options.map((opt, idx) => {
                let cls = 'answer-option'
                if (showFeedback) {
                  if (idx === currentEx.correct) cls += ' answer-correct'
                  else if (idx === selected && !isCorrect) cls += ' answer-wrong animate-shake'
                } else if (selected === idx) cls += ' answer-selected'
                return (
                  <button key={idx} className={cls} onClick={() => handleAnswer(idx)}>
                    {opt}
                  </button>
                )
              })}
            </div>
          </>
        )}

        {/* Feedback */}
        {showFeedback && (
          <div className={`rounded-2xl p-4 mt-4 animate-slide-up ${isCorrect ? 'bg-brand-50 border border-brand-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{isCorrect ? '✅' : '❌'}</span>
              <span className={`font-bold ${isCorrect ? 'text-brand-700' : 'text-red-700'}`}>
                {isCorrect ? 'Bonne réponse !' : 'Pas tout à fait…'}
              </span>
            </div>
            <p className="text-sm text-gray-700">{currentEx.explanation}</p>
          </div>
        )}

        {/* Submit reorder */}
        {currentEx.type === 'reorder' && !showFeedback && (
          <button className="btn-primary w-full mt-4" onClick={handleReorderSubmit} disabled={!reorderItems}>
            Valider l'ordre
          </button>
        )}

        {/* Next */}
        {showFeedback && (
          <button className="btn-primary w-full mt-4 animate-slide-up" onClick={handleNext}>
            {exIdx + 1 < exercises.length ? 'Exercice suivant →' : 'Terminer la leçon 🎉'}
          </button>
        )}
      </div>
    </div>
  )
}

function ReorderExercise({ exercise, reorderItems, setReorderItems, showFeedback, onSubmit }) {
  const items = reorderItems || exercise.items.map((_, i) => i)
  const correctOrder = exercise.correct

  function moveItem(fromIdx, toIdx) {
    if (showFeedback) return
    const newOrder = [...items]
    const [moved] = newOrder.splice(fromIdx, 1)
    newOrder.splice(toIdx, 0, moved)
    setReorderItems(newOrder)
  }

  const isCorrect = JSON.stringify(items) === JSON.stringify(correctOrder)

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-4">{exercise.question}</h3>
      <div className="space-y-2">
        {items.map((itemIdx, pos) => {
          let bg = 'bg-white border-gray-200'
          if (showFeedback) {
            bg = isCorrect ? 'bg-brand-50 border-brand-300' : 'bg-red-50 border-red-200'
          }
          return (
            <div key={itemIdx} className={`border-2 ${bg} rounded-xl p-3 flex items-center gap-3`}>
              <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">
                {pos + 1}
              </span>
              <span className="flex-1 text-sm font-medium text-gray-800">{exercise.items[itemIdx]}</span>
              {!showFeedback && (
                <div className="flex flex-col gap-0.5">
                  <button onClick={() => pos > 0 && moveItem(pos, pos - 1)} className="text-gray-300 hover:text-gray-600 text-xs leading-none" disabled={pos === 0}>▲</button>
                  <button onClick={() => pos < items.length - 1 && moveItem(pos, pos + 1)} className="text-gray-300 hover:text-gray-600 text-xs leading-none" disabled={pos === items.length - 1}>▼</button>
                </div>
              )}
            </div>
          )
        })}
      </div>
      {showFeedback && (
        <div className={`rounded-2xl p-4 mt-4 animate-slide-up ${isCorrect ? 'bg-brand-50 border border-brand-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{isCorrect ? '✅' : '❌'}</span>
            <span className={`font-bold ${isCorrect ? 'text-brand-700' : 'text-red-700'}`}>
              {isCorrect ? 'Parfait !' : 'Pas tout à fait…'}
            </span>
          </div>
          <p className="text-sm text-gray-700">{exercise.explanation}</p>
        </div>
      )}
    </div>
  )
}

function TopBar({ title, onBack, progress, label }) {
  return (
    <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-10 shadow-sm">
      <button onClick={onBack} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 flex-shrink-0">
        ✕
      </button>
      <div className="flex-1 progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <span className="text-xs text-gray-400 font-semibold flex-shrink-0">{label}</span>
    </div>
  )
}
