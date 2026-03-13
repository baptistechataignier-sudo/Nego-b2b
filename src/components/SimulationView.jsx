import React, { useState } from 'react'
import { SIMULATION_IT_RENOUVELLEMENT } from '../data/simulation.js'

const SIM_MAP = {
  'sim-it-renouvellement': SIMULATION_IT_RENOUVELLEMENT,
}

export default function SimulationView({ simId, dispatch }) {
  const sim = SIM_MAP[simId]
  const [phase, setPhase] = useState('intro') // intro | step | result
  const [stepIdx, setStepIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [totalScore, setTotalScore] = useState(0)
  const [stepHistory, setStepHistory] = useState([])

  if (!sim) return <div className="p-8 text-center text-gray-400">Simulation introuvable.</div>

  const steps = sim.steps
  const current = steps[stepIdx]
  const progress = Math.round(((stepIdx + (showFeedback ? 1 : 0)) / steps.length) * 100)

  function handleChoose(optIdx) {
    if (showFeedback) return
    const opt = current.options[optIdx]
    setSelected(optIdx)
    setShowFeedback(true)
    setTotalScore(s => s + (opt.score || 0))
    setStepHistory(h => [...h, { stepId: current.id, optIdx, score: opt.score || 0 }])
  }

  function handleNext() {
    setSelected(null)
    setShowFeedback(false)
    if (stepIdx + 1 < steps.length) {
      setStepIdx(i => i + 1)
    } else {
      setPhase('result')
    }
  }

  function handleFinish() {
    dispatch({
      type: 'COMPLETE_SIMULATION',
      simId: sim.id,
      score: totalScore,
      xp: sim.xpReward,
    })
  }

  // ── INTRO ──
  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <div className="bg-gray-800 px-4 py-3 flex items-center gap-3">
          <button onClick={() => dispatch({ type: 'SET_VIEW', view: 'dashboard' })} className="text-gray-400 hover:text-white p-1">←</button>
          <span className="font-bold">Simulation</span>
        </div>

        <div className="flex-1 max-w-lg mx-auto w-full p-4 flex flex-col justify-center">
          <div className="text-center mb-6">
            <div className="text-6xl mb-3">{sim.icon}</div>
            <span className="text-xs bg-blue-500/20 text-blue-300 font-bold px-3 py-1 rounded-full">{sim.sector}</span>
            <h2 className="text-2xl font-black mt-3 mb-1">{sim.title}</h2>
            <p className="text-gray-400">{sim.subtitle}</p>
          </div>

          {/* Buyer profile */}
          <div className="bg-gray-800 rounded-2xl p-4 mb-5">
            <p className="text-xs font-bold text-gray-400 uppercase mb-2">Votre interlocuteur</p>
            <div className="flex items-center gap-3">
              <div className="text-4xl">{sim.buyerProfile.avatar}</div>
              <div>
                <p className="font-black text-white">{sim.buyerProfile.name}</p>
                <p className="text-gray-400 text-sm">{sim.buyerProfile.role}</p>
                <span className="text-xs bg-red-500/20 text-red-300 font-bold px-2 py-0.5 rounded-full">{sim.buyerProfile.style}</span>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {sim.buyerProfile.traits.map(t => (
                <span key={t} className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">{t}</span>
              ))}
            </div>
          </div>

          {/* Context */}
          <div className="bg-gray-800 rounded-2xl p-4 mb-6">
            <p className="text-xs font-bold text-gray-400 uppercase mb-2">Contexte</p>
            <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-line prose-invert"
              dangerouslySetInnerHTML={{ __html: sim.context.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
            />
          </div>

          <div className="flex items-center justify-between mb-5">
            <span className="xp-badge text-base">+{sim.xpReward} XP</span>
            <span className="text-sm text-gray-400">{steps.length} étapes · {sim.duration}</span>
          </div>

          <button className="btn-primary w-full text-lg" onClick={() => setPhase('step')}>
            Démarrer la simulation 🎭
          </button>
        </div>
      </div>
    )
  }

  // ── RESULT ──
  if (phase === 'result') {
    const breakdown = sim.scoreBreakdown
    const result = totalScore >= breakdown.excellent.min ? breakdown.excellent :
                   totalScore >= breakdown.good.min ? breakdown.good :
                   totalScore >= breakdown.average.min ? breakdown.average :
                   breakdown.beginner
    const maxPossible = steps.reduce((s, step) => s + Math.max(...step.options.map(o => o.score || 0)), 0)
    const pct = maxPossible > 0 ? Math.round((totalScore / maxPossible) * 100) : 0

    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-3xl p-8 text-center animate-pop">
          <div className="text-6xl mb-3 animate-bounce-in">{result.badge}</div>
          <h2 className="text-2xl font-black mb-1">Simulation terminée !</h2>
          <p className="text-gray-400 text-sm mb-5">{sim.title}</p>

          <div className="bg-gray-700/50 rounded-2xl p-5 mb-5">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Votre performance</p>
            <p className="text-4xl font-black text-white">{pct}%</p>
            <p className="text-brand-400 font-bold mt-1">{result.label}</p>
            <p className="text-gray-400 text-sm mt-2">{result.description}</p>
            <div className="mt-3 flex justify-center gap-4 text-sm text-gray-300">
              <span>Score : {totalScore} pts</span>
              <span>·</span>
              <span className="xp-badge">+{sim.xpReward} XP</span>
            </div>
          </div>

          {/* Step breakdown */}
          <div className="mb-5">
            <p className="text-xs font-bold text-gray-400 uppercase mb-3 text-left">Détail par étape</p>
            <div className="space-y-2">
              {stepHistory.map((h, i) => {
                const step = steps.find(s => s.id === h.stepId)
                const opt = step?.options[h.optIdx]
                return (
                  <div key={i} className="flex items-center gap-3 bg-gray-700/30 rounded-xl px-3 py-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      opt?.quality === 'good' ? 'bg-brand-500/20 text-brand-400' :
                      opt?.quality === 'terrible' ? 'bg-red-500/20 text-red-400' :
                      opt?.quality === 'bad' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {opt?.quality === 'good' ? '✓' : opt?.quality === 'terrible' ? '✗' : opt?.quality === 'bad' ? '!' : '~'}
                    </span>
                    <span className="text-xs text-gray-300 flex-1 text-left">Étape {i + 1}</span>
                    <span className={`text-sm font-bold ${h.score > 0 ? 'text-brand-400' : h.score < 0 ? 'text-red-400' : 'text-gray-500'}`}>
                      {h.score > 0 ? '+' : ''}{h.score} pts
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="h-2 bg-gray-700 rounded-full mb-5 overflow-hidden">
            <div className="h-full bg-brand-500 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
          </div>

          <div className="flex gap-3">
            <button className="btn-secondary flex-1 bg-gray-700 text-white border-gray-600 hover:bg-gray-600" onClick={() => { setPhase('step'); setStepIdx(0); setTotalScore(0); setStepHistory([]); setSelected(null); setShowFeedback(false) }}>
              Rejouer
            </button>
            <button className="btn-primary flex-1" onClick={handleFinish}>
              Terminer 🏠
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── STEP ──
  const selectedOpt = selected !== null ? current.options[selected] : null

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Top bar */}
      <div className="bg-gray-800 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => dispatch({ type: 'SET_VIEW', view: 'dashboard' })} className="text-gray-400 hover:text-white p-1 flex-shrink-0">✕</button>
        <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-brand-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-xs text-gray-400 font-semibold flex-shrink-0">{stepIdx + 1}/{steps.length}</span>
      </div>

      <div className="flex-1 max-w-lg mx-auto w-full p-4 flex flex-col">
        {/* Score */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-gray-400 uppercase">Score</span>
          <span className={`text-lg font-black ${totalScore >= 0 ? 'text-brand-400' : 'text-red-400'}`}>{totalScore} pts</span>
        </div>

        {/* Buyer says */}
        <div className="bg-gray-800 rounded-2xl p-4 mb-4 animate-pop">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{sim.buyerProfile.avatar}</span>
            <div>
              <p className="text-xs font-bold text-gray-300">{sim.buyerProfile.name}</p>
              <p className="text-xs text-gray-500">{sim.buyerProfile.role}</p>
            </div>
          </div>
          <p className="text-sm text-white leading-relaxed italic">« {current.buyerSays} »</p>
        </div>

        {/* Situation */}
        <div className="bg-blue-900/30 border border-blue-700/30 rounded-xl px-3 py-2 mb-4">
          <p className="text-xs text-blue-300">{current.situation}</p>
        </div>

        {/* Question */}
        <p className="text-base font-bold text-white mb-4">{current.question}</p>

        {/* Options */}
        <div className="space-y-2 flex-1">
          {current.options.map((opt, idx) => {
            let cls = 'w-full text-left p-3 rounded-xl border-2 transition-all duration-150 font-medium text-sm cursor-pointer'
            if (showFeedback) {
              if (idx === current.bestOption) cls += ' border-brand-500 bg-brand-500/20 text-brand-200'
              else if (idx === selected && idx !== current.bestOption) cls += ` ${opt.quality === 'terrible' ? 'border-red-500 bg-red-500/20 text-red-300 animate-shake' : 'border-orange-500 bg-orange-500/20 text-orange-200'}`
              else cls += ' border-gray-700 bg-gray-800 text-gray-400'
            } else if (selected === idx) {
              cls += ' border-blue-400 bg-blue-500/20 text-blue-200'
            } else {
              cls += ' border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-500 hover:bg-gray-700'
            }
            return (
              <button key={idx} className={cls} onClick={() => handleChoose(idx)}>
                {opt.text}
              </button>
            )
          })}
        </div>

        {/* Feedback */}
        {showFeedback && selectedOpt && (
          <div className="mt-4 animate-slide-up">
            {/* Consequence */}
            <div className="bg-gray-800 rounded-xl p-3 mb-3">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Réaction de l'acheteur</p>
              <p className="text-sm text-gray-200 italic">{ selectedOpt.consequence}</p>
            </div>
            {/* Analysis */}
            <div className={`rounded-xl p-3 mb-3 ${
              selectedOpt.quality === 'good' ? 'bg-brand-500/20 border border-brand-500/30' :
              selectedOpt.quality === 'terrible' ? 'bg-red-500/20 border border-red-500/30' :
              selectedOpt.quality === 'bad' ? 'bg-orange-500/20 border border-orange-500/30' :
              'bg-yellow-500/20 border border-yellow-500/30'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                <span>{selectedOpt.quality === 'good' ? '✅' : selectedOpt.quality === 'terrible' ? '💀' : selectedOpt.quality === 'bad' ? '❌' : '⚠️'}</span>
                <span className={`text-sm font-bold ${
                  selectedOpt.quality === 'good' ? 'text-brand-300' :
                  selectedOpt.quality === 'terrible' ? 'text-red-300' :
                  selectedOpt.quality === 'bad' ? 'text-orange-300' : 'text-yellow-300'
                }`}>
                  {selectedOpt.quality === 'good' ? `Excellent ! +${selectedOpt.score} pts` :
                   selectedOpt.quality === 'terrible' ? `Erreur critique ! ${selectedOpt.score} pts` :
                   selectedOpt.quality === 'bad' ? `À éviter ! +${selectedOpt.score} pts` :
                   `Passable ! +${selectedOpt.score} pts`}
                </span>
              </div>
              <p className="text-xs text-gray-300">{selectedOpt.feedback}</p>
            </div>
            <button className="btn-primary w-full" onClick={handleNext}>
              {stepIdx + 1 < steps.length ? 'Étape suivante →' : 'Voir mes résultats 🏆'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
