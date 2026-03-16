import { useState } from 'react'
import { MODULES } from '../data/modules'
import LessonCard from './exercises/LessonCard'
import MCQExercise from './exercises/MCQExercise'
import ScenarioExercise from './exercises/ScenarioExercise'
import MatchingExercise from './exercises/MatchingExercise'
import OrderingExercise from './exercises/OrderingExercise'
import HeartBar from './ui/HeartBar'

export default function LessonView({ state, dispatch }) {
  const { activeLesson, lessonSession, user } = state
  const [showFeedback, setShowFeedback] = useState(false)
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(null)

  // Find lesson data
  const module = MODULES.find(m => m.id === activeLesson?.moduleId)
  const lesson = module?.lessons.find(l => l.id === activeLesson?.lessonId)

  if (!lesson || !lessonSession) return null

  const { exerciseIndex, phase } = lessonSession
  const exercises = lesson.exercises
  const currentExercise = exercises[exerciseIndex]
  const progress = exerciseIndex / exercises.length
  const allLessonIds = module.lessons.map(l => l.id)

  // ── Complete screen ────────────────────────────────────────────────────────
  if (phase === 'complete') {
    return (
      <CompleteScreen
        lesson={lesson}
        session={lessonSession}
        user={user}
        onContinue={() => dispatch({ type: 'NAVIGATE', payload: 'dashboard' })}
        onRetry={() => dispatch({ type: 'START_LESSON', payload: { moduleId: activeLesson.moduleId, lessonId: activeLesson.lessonId } })}
      />
    )
  }

  // ── Exercise answer handler ────────────────────────────────────────────────
  function handleAnswer({ correct, xpGained, done = false }) {
    if (!done) {
      // First call: register the answer
      dispatch({ type: 'ANSWER_EXERCISE', payload: { correct, xpGained, exerciseIndex } })
      setLastAnswerCorrect(correct)
    } else {
      // Second call (after feedback): advance
      const nextIndex = exerciseIndex + 1
      if (nextIndex >= exercises.length) {
        // Lesson complete
        const session = state.lessonSession
        const totalXP = session.xpEarned + (correct ? xpGained : 0)
        const perfect = (session.mistakes + (correct ? 0 : 1)) === 0

        dispatch({
          type: 'COMPLETE_LESSON',
          payload: {
            lessonId: lesson.id,
            moduleId: module.id,
            totalXP: lesson.xpReward,
            perfect,
            allLessonIds,
          },
        })
      } else {
        dispatch({ type: 'NEXT_EXERCISE' })
        setLastAnswerCorrect(null)
      }
    }
  }

  function handleLessonCardNext() {
    const nextIndex = exerciseIndex + 1
    if (nextIndex >= exercises.length) {
      dispatch({ type: 'COMPLETE_LESSON', payload: { lessonId: lesson.id, moduleId: module.id, totalXP: lesson.xpReward, perfect: true, allLessonIds } })
    } else {
      dispatch({ type: 'NEXT_EXERCISE' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── Top bar ──────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => dispatch({ type: 'NAVIGATE', payload: 'dashboard' })}
            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
            aria-label="Retour"
          >
            ×
          </button>
          {/* Progress bar */}
          <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full transition-all duration-500"
              style={{ width: `${(exerciseIndex / exercises.length) * 100}%` }}
            />
          </div>
          <HeartBar hearts={user.hearts} />
        </div>
      </header>

      {/* ── Exercise area ─────────────────────────────────────────────── */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        {/* Lesson header */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">{lesson.icon}</span>
          <div>
            <p className="text-xs text-gray-400">{module.title}</p>
            <h1 className="font-display font-black text-lg text-gray-900">{lesson.title}</h1>
          </div>
          <span className="ml-auto text-sm text-gray-400">{exerciseIndex + 1}/{exercises.length}</span>
        </div>

        {/* Render exercise by type */}
        <ExerciseRenderer
          key={exerciseIndex}
          exercise={currentExercise}
          onAnswer={handleAnswer}
          onNext={handleLessonCardNext}
        />
      </main>
    </div>
  )
}

// ── Exercise router ───────────────────────────────────────────────────────────
function ExerciseRenderer({ exercise, onAnswer, onNext }) {
  switch (exercise.type) {
    case 'lesson':
      return <LessonCard exercise={exercise} onNext={onNext} />
    case 'qcm':
      return <MCQExercise exercise={exercise} onAnswer={onAnswer} />
    case 'scenario':
      return <ScenarioExercise exercise={exercise} onAnswer={onAnswer} />
    case 'matching':
      return <MatchingExercise exercise={exercise} onAnswer={onAnswer} />
    case 'ordering':
      return <OrderingExercise exercise={exercise} onAnswer={onAnswer} />
    default:
      return <div className="text-gray-400">Type d'exercice inconnu</div>
  }
}

// ── Complete screen ───────────────────────────────────────────────────────────
function CompleteScreen({ lesson, session, user, onContinue, onRetry }) {
  const { mistakes, xpEarned } = session
  const perfect = mistakes === 0
  const stars = perfect ? 3 : mistakes <= 1 ? 2 : 1

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-600 to-brand-900 flex flex-col items-center justify-center px-4 text-white animate-fade-in">
      <div className="max-w-sm w-full text-center space-y-6">
        {/* Stars */}
        <div className="flex justify-center gap-3 text-5xl">
          {[1, 2, 3].map(i => (
            <span
              key={i}
              className={`transition-all duration-300 ${i <= stars ? 'animate-bounce-in' : 'opacity-30 grayscale'}`}
              style={{ animationDelay: `${(i - 1) * 150}ms` }}
            >
              ⭐
            </span>
          ))}
        </div>

        {/* Title */}
        <div>
          <h1 className="font-display font-black text-4xl mb-2">
            {perfect ? 'Parfait !' : stars >= 2 ? 'Bien joué !' : 'Continuer !'}
          </h1>
          <p className="text-brand-200">
            {perfect ? 'Aucune erreur, vous maîtrisez ce sujet !' :
             mistakes === 1 ? '1 erreur — vous progressez !' :
             `${mistakes} erreurs — relisez la leçon si besoin`}
          </p>
        </div>

        {/* XP reward */}
        <div className="bg-white/10 backdrop-blur rounded-3xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-brand-200">XP gagnés</span>
            <span className="font-display font-black text-2xl text-xp-gold">+{xpEarned} ⭐</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-brand-200">Leçon terminée</span>
            <span className="font-bold">{lesson.icon} {lesson.title}</span>
          </div>
          {perfect && (
            <div className="flex justify-between items-center">
              <span className="text-brand-200">Bonus parfait</span>
              <span className="text-yellow-300 font-bold">💎 Sans faute</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={onContinue}
            className="w-full bg-white text-brand-700 font-bold py-4 rounded-2xl hover:bg-brand-50 transition-colors text-lg active:scale-95"
          >
            Continuer l'apprentissage →
          </button>
          <button
            onClick={onRetry}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-2xl transition-colors"
          >
            🔄 Rejouer la leçon
          </button>
        </div>
      </div>
    </div>
  )
}
