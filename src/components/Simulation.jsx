import { useState, useRef, useEffect } from 'react'
import { SIMULATIONS } from '../data/modules'

export default function Simulation({ state, dispatch }) {
  const { activeSimulation } = state
  const sim = SIMULATIONS.find(s => s.id === activeSimulation)

  const [stepIdx, setStepIdx] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [totalScore, setTotalScore] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [history, setHistory] = useState([]) // { speaker, text, quality }
  const [phase, setPhase] = useState('intro') // intro | playing | result
  const [nextBuyerMsg, setNextBuyerMsg] = useState(null)

  const chatRef = useRef(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [history, feedback])

  if (!sim) return null

  // ── Intro screen ─────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <SimHeader title={sim.title} onBack={() => dispatch({ type: 'NAVIGATE', payload: 'dashboard' })} />
        <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-6">
          {/* Banner */}
          <div className={`bg-gradient-to-br ${sim.color} rounded-3xl p-6 text-white`}>
            <div className="text-4xl mb-2">{sim.icon}</div>
            <h1 className="font-display font-black text-2xl mb-1">{sim.title}</h1>
            <p className="text-white/80 text-sm">{sim.subtitle}</p>
            <div className="mt-3 flex gap-3 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">{sim.duration}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">{sim.difficulty}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">+{sim.xpReward} XP</span>
            </div>
          </div>

          {/* Context */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
            <h2 className="font-bold text-gray-900">📋 Contexte de la simulation</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{sim.context}</p>
          </div>

          {/* Buyer profile */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-bold text-gray-900 mb-3">👔 Votre interlocuteur</h2>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-2xl">
                {sim.buyerProfile.avatar}
              </div>
              <div>
                <p className="font-bold text-gray-900">{sim.buyerProfile.name}</p>
                <p className="text-sm text-gray-500">{sim.buyerProfile.title}</p>
                <p className="text-sm text-gray-600 mt-2 italic">"{sim.buyerProfile.style}"</p>
              </div>
            </div>
          </div>

          {/* Objectives */}
          <div className="bg-brand-50 border border-brand-200 rounded-2xl p-4">
            <h3 className="font-bold text-brand-800 mb-2">🎯 Votre objectif</h3>
            <p className="text-sm text-brand-700">
              Négocier le renouvellement du contrat en maintenant un montant ≥ 115 000 €/an. Chaque décision compte !
            </p>
          </div>

          <button
            onClick={() => {
              setPhase('playing')
              const firstMsg = sim.steps[0].buyerMessage
              setHistory([{ speaker: 'buyer', text: firstMsg }])
            }}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-2xl transition-all text-lg active:scale-95"
          >
            Démarrer la simulation 🚀
          </button>
        </main>
      </div>
    )
  }

  // ── Result screen ─────────────────────────────────────────────────────────
  if (phase === 'result') {
    const maxScore = sim.steps.reduce((acc, step) => acc + Math.max(...step.options.map(o => o.score)), 0)
    const pct = Math.round((totalScore / maxScore) * 100)
    const xpEarned = Math.round((pct / 100) * sim.xpReward)

    let resultLabel, resultIcon, resultColor
    if (pct >= 80) { resultLabel = 'Négociateur Expert'; resultIcon = '🏆'; resultColor = 'text-yellow-600' }
    else if (pct >= 55) { resultLabel = 'Bon Négociateur'; resultIcon = '🥈'; resultColor = 'text-gray-500' }
    else { resultLabel = 'À Améliorer'; resultIcon = '📚'; resultColor = 'text-orange-500' }

    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-600 to-brand-900 flex flex-col items-center justify-center px-4 text-white animate-fade-in">
        <div className="max-w-sm w-full text-center space-y-6">
          <div className="text-6xl animate-bounce-in">{resultIcon}</div>
          <div>
            <h1 className="font-display font-black text-3xl mb-1">{resultLabel}</h1>
            <p className="text-brand-200">Score : {pct}% ({totalScore}/{maxScore} points)</p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-3xl p-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-brand-200">XP gagnés</span>
              <span className="font-bold text-xp-gold">+{xpEarned} ⭐</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-200">Décisions prises</span>
              <span className="font-bold">{sim.steps.length}</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-xp-gold rounded-full transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Tips based on score */}
          {pct < 80 && (
            <div className="bg-white/10 rounded-2xl p-4 text-left text-sm text-brand-200">
              <p className="font-bold text-white mb-1">💡 Conseil</p>
              {pct < 50
                ? "Repassez les leçons sur le BATNA et les concessions pour mieux positionner vos offres."
                : "Bon début ! Travaillez sur les concessions conditionnelles pour améliorer votre score."}
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={() => {
                dispatch({ type: 'COMPLETE_SIMULATION', payload: { xpGained: xpEarned } })
                dispatch({ type: 'NAVIGATE', payload: 'dashboard' })
              }}
              className="w-full bg-white text-brand-700 font-bold py-4 rounded-2xl hover:bg-brand-50 transition-colors text-lg active:scale-95"
            >
              Retour au tableau de bord →
            </button>
            <button
              onClick={() => {
                setStepIdx(0); setSelectedOption(null); setConfirmed(false)
                setTotalScore(0); setFeedback(null); setHistory([])
                setPhase('intro'); setNextBuyerMsg(null)
              }}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-2xl transition-colors"
            >
              🔄 Rejouer
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Playing ───────────────────────────────────────────────────────────────
  const currentStep = sim.steps[stepIdx]
  const options = currentStep.options

  function handleConfirm() {
    if (selectedOption === null || confirmed) return
    const opt = options[selectedOption]

    setConfirmed(true)
    setFeedback(opt)
    setTotalScore(prev => prev + opt.score)

    // Add user message + buyer response to history
    setHistory(prev => [
      ...prev,
      { speaker: 'user', text: opt.text, quality: opt.quality },
      ...(opt.nextBuyerMessage ? [{ speaker: 'buyer', text: opt.nextBuyerMessage }] : []),
    ])
    setNextBuyerMsg(opt.nextBuyerMessage)
  }

  function handleNext() {
    const next = stepIdx + 1
    if (next >= sim.steps.length) {
      setPhase('result')
    } else {
      setStepIdx(next)
      setSelectedOption(null)
      setConfirmed(false)
      setFeedback(null)
      // Next step may have its own buyerMessage or use nextBuyerMessage from prev step
      const nextStep = sim.steps[next]
      if (nextStep.buyerMessage) {
        setHistory(prev => [...prev, { speaker: 'buyer', text: nextStep.buyerMessage }])
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SimHeader title={sim.title} onBack={() => dispatch({ type: 'NAVIGATE', payload: 'dashboard' })} step={stepIdx + 1} total={sim.steps.length} />

      {/* Chat history */}
      <div ref={chatRef} className="flex-1 max-w-2xl mx-auto w-full px-4 py-4 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 320px)' }}>
        {history.map((msg, i) => (
          <ChatBubble key={i} message={msg} buyerName={sim.buyerProfile.name} buyerAvatar={sim.buyerProfile.avatar} />
        ))}
      </div>

      {/* Feedback banner */}
      {feedback && (
        <div className={`max-w-2xl mx-auto w-full px-4 mb-2`}>
          <div className={`rounded-2xl p-4 text-sm ${
            feedback.quality === 'good' ? 'bg-success-light border border-success' :
            feedback.quality === 'ok' ? 'bg-yellow-50 border border-yellow-300' :
            'bg-danger-light border border-danger'
          }`}>
            <p className={`font-bold mb-1 ${
              feedback.quality === 'good' ? 'text-green-800' :
              feedback.quality === 'ok' ? 'text-yellow-800' : 'text-red-800'
            }`}>
              {feedback.quality === 'good' ? '✅ Excellente réponse !' :
               feedback.quality === 'ok' ? '⚠️ Réponse acceptable' : '❌ Erreur de négociation'}
            </p>
            <p className={`${
              feedback.quality === 'good' ? 'text-green-700' :
              feedback.quality === 'ok' ? 'text-yellow-700' : 'text-red-700'
            }`}>
              {feedback.feedback}
            </p>
          </div>
        </div>
      )}

      {/* Options or Continue */}
      <div className="bg-white border-t border-gray-200 max-w-2xl mx-auto w-full px-4 py-4 space-y-2">
        {!confirmed ? (
          <>
            <p className="text-sm font-semibold text-gray-600 mb-2">Votre réponse :</p>
            {options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOption(idx)}
                className={`w-full p-3 rounded-xl text-sm text-left border-2 transition-all ${
                  selectedOption === idx
                    ? 'border-brand-500 bg-brand-50 text-brand-900 font-medium'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-brand-300'
                }`}
              >
                <span className={`inline-flex w-5 h-5 rounded-full items-center justify-center text-xs font-bold mr-2 ${
                  selectedOption === idx ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-500'
                }`}>{idx + 1}</span>
                <span className="italic">"{opt.text}"</span>
              </button>
            ))}
            <button
              onClick={handleConfirm}
              disabled={selectedOption === null}
              className={`w-full font-bold py-3 rounded-2xl transition-all mt-2 ${
                selectedOption !== null
                  ? 'bg-brand-600 hover:bg-brand-700 text-white active:scale-95'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Envoyer ma réponse
            </button>
          </>
        ) : (
          <button
            onClick={handleNext}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-2xl transition-all active:scale-95"
          >
            {stepIdx + 1 >= sim.steps.length ? 'Voir les résultats 🏆' : 'Scène suivante →'}
          </button>
        )}
      </div>
    </div>
  )
}

function SimHeader({ title, onBack, step, total }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
        >
          ×
        </button>
        <div className="flex-1">
          <p className="text-xs text-gray-400">Simulation</p>
          <h1 className="font-bold text-gray-900 text-sm">{title}</h1>
        </div>
        {step && (
          <div className="text-sm text-gray-500">
            Scène {step}/{total}
          </div>
        )}
      </div>
      {step && (
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-brand-500 transition-all duration-500"
            style={{ width: `${(step / total) * 100}%` }}
          />
        </div>
      )}
    </header>
  )
}

function ChatBubble({ message, buyerName, buyerAvatar }) {
  const isUser = message.speaker === 'user'

  const qualityColor = message.quality === 'good' ? 'ring-2 ring-success' :
                       message.quality === 'bad' ? 'ring-2 ring-danger' : ''

  return (
    <div className={`flex items-end gap-2 animate-slide-up ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-brand-100' : 'bg-red-100'
      }`}>
        {isUser ? '🤝' : buyerAvatar}
      </div>
      <div className={`max-w-xs lg:max-w-sm ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <p className={`text-xs font-medium ${isUser ? 'text-right text-brand-600' : 'text-gray-500'}`}>
          {isUser ? 'Vous' : buyerName}
        </p>
        <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${qualityColor} ${
          isUser
            ? 'bg-brand-600 text-white rounded-br-none'
            : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
        }`}>
          {isUser ? `"${message.text}"` : message.text}
        </div>
      </div>
    </div>
  )
}
