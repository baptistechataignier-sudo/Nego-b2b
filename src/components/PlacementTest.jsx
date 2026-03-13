import React, { useState } from 'react'
import { PLACEMENT_TEST, computePlacementLevel } from '../data/placementTest.js'

export default function PlacementTest({ onComplete }) {
  const [step, setStep] = useState(0) // 0 = intro, 1..10 = questions, 11 = result
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const questions = PLACEMENT_TEST.questions
  const current = questions[step - 1]

  function handleAnswer(idx) {
    if (showFeedback) return
    setSelected(idx)
    setShowFeedback(true)
  }

  function handleNext() {
    const newAnswers = [...answers, { questionId: current.id, selectedIndex: selected }]
    setAnswers(newAnswers)
    setSelected(null)
    setShowFeedback(false)

    if (step >= questions.length) {
      // Show result
      setStep(step + 1)
    } else {
      setStep(step + 1)
    }
  }

  function handleFinish() {
    const level = computePlacementLevel(answers)
    onComplete({ level, answers })
  }

  const progress = step === 0 ? 0 : Math.round((step / questions.length) * 100)

  // ── Intro ──
  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 animate-pop text-center">
          <div className="text-6xl mb-4">🧭</div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Test de Niveau</h2>
          <p className="text-gray-500 mb-6">
            10 questions pour placer votre parcours. Il n'y a pas de mauvaises réponses —
            seulement une façon de vous positionner au meilleur endroit pour progresser.
          </p>
          <div className="bg-brand-50 rounded-xl p-4 mb-6 text-left space-y-2">
            <div className="flex items-center gap-2 text-sm text-brand-700">
              <span>⏱️</span><span>Environ 5 minutes</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-brand-700">
              <span>🎯</span><span>Placement automatique Niveaux 1, 2 ou 3</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-brand-700">
              <span>💡</span><span>Explication après chaque réponse</span>
            </div>
          </div>
          <button className="btn-primary w-full" onClick={() => setStep(1)}>
            Commencer le test →
          </button>
        </div>
      </div>
    )
  }

  // ── Result ──
  if (step > questions.length) {
    const level = computePlacementLevel(answers)
    const correct = answers.filter((a, i) => a.selectedIndex === questions[i].correct).length
    const levelInfo = {
      1: { label: 'Commercial Junior', icon: '🌱', color: 'text-green-600', bg: 'bg-green-50', desc: 'Vous démarrez le parcours depuis les fondamentaux. Bonne nouvelle : les bases bien maîtrisées font les meilleurs négociateurs.' },
      2: { label: 'Commercial Confirmé', icon: '⭐', color: 'text-blue-600', bg: 'bg-blue-50', desc: 'Vous avez de bonnes bases. Votre parcours commence au Niveau 2 — défense des marges et négociation multi-interlocuteurs.' },
      3: { label: 'Key Account Manager', icon: '🏆', color: 'text-purple-600', bg: 'bg-purple-50', desc: 'Excellent niveau ! Vous accédez directement aux techniques avancées de management de comptes stratégiques.' },
    }
    const info = levelInfo[level]
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 animate-pop text-center">
          <div className="text-6xl mb-3 animate-bounce-in">{info.icon}</div>
          <h2 className="text-2xl font-black text-gray-900 mb-1">Résultat du test</h2>
          <p className="text-gray-400 text-sm mb-5">{correct}/{questions.length} bonnes réponses</p>

          <div className={`${info.bg} rounded-2xl p-5 mb-6`}>
            <p className={`text-xs font-bold uppercase tracking-widest ${info.color} mb-1`}>Votre niveau</p>
            <p className={`text-2xl font-black ${info.color}`}>{info.label}</p>
            <p className="text-gray-600 text-sm mt-2">{info.desc}</p>
          </div>

          {/* Score bar */}
          <div className="mb-6">
            <div className="progress-bar mb-1">
              <div className="progress-fill" style={{ width: `${(correct / questions.length) * 100}%` }} />
            </div>
            <p className="text-xs text-gray-400 text-right">{correct}/{questions.length}</p>
          </div>

          <button className="btn-primary w-full text-lg" onClick={handleFinish}>
            Démarrer mon parcours {info.icon}
          </button>
        </div>
      </div>
    )
  }

  // ── Question ──
  const isCorrect = selected === current.correct
  const qNum = step

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-4 sticky top-0 z-10">
        <button className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100" onClick={() => setStep(step - 1 > 0 ? step - 1 : 0)}>
          ←
        </button>
        <div className="flex-1 progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-xs text-gray-400 font-semibold w-10 text-right">{qNum}/{questions.length}</span>
      </div>

      <div className="flex-1 p-4 max-w-lg mx-auto w-full">
        {/* Level indicator */}
        <div className="mb-3">
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
            current.level === 1 ? 'bg-green-100 text-green-700' :
            current.level === 2 ? 'bg-blue-100 text-blue-700' :
            'bg-purple-100 text-purple-700'
          }`}>
            Niveau {current.level}
          </span>
          {current.type === 'vrai_faux' && (
            <span className="ml-2 text-xs font-bold px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
              Vrai / Faux
            </span>
          )}
        </div>

        {/* Question */}
        <h3 className="text-xl font-bold text-gray-900 mb-6 leading-snug">{current.question}</h3>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {current.options.map((opt, idx) => {
            let cls = 'answer-option'
            if (showFeedback) {
              if (idx === current.correct) cls += ' answer-correct'
              else if (idx === selected && !isCorrect) cls += ' answer-wrong animate-shake'
            } else if (selected === idx) {
              cls += ' answer-selected'
            }
            return (
              <button key={idx} className={cls} onClick={() => handleAnswer(idx)}>
                <span className="inline-block w-6 h-6 rounded-full border-2 border-current mr-2 text-xs flex items-center justify-center font-bold" style={{ display: 'inline-flex' }}>
                  {String.fromCharCode(65 + idx)}
                </span>
                {opt}
              </button>
            )
          })}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={`rounded-2xl p-4 mb-4 animate-slide-up ${isCorrect ? 'bg-brand-50 border border-brand-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{isCorrect ? '✅' : '❌'}</span>
              <span className={`font-bold ${isCorrect ? 'text-brand-700' : 'text-red-700'}`}>
                {isCorrect ? 'Bonne réponse !' : 'Pas tout à fait…'}
              </span>
            </div>
            <p className="text-sm text-gray-700">{current.explanation}</p>
          </div>
        )}

        {/* Next button */}
        {showFeedback && (
          <button className="btn-primary w-full animate-slide-up" onClick={handleNext}>
            {step < questions.length ? 'Question suivante →' : 'Voir mon résultat'}
          </button>
        )}
      </div>
    </div>
  )
}
