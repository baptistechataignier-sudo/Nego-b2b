import React from 'react'

export default function WelcomeScreen({ onStart, onContinue, hasSave }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 flex flex-col items-center justify-center p-6 text-white">
      <div className="max-w-md w-full text-center animate-slide-up">
        {/* Logo */}
        <div className="text-8xl mb-4 animate-bounce-in">🤝</div>
        <h1 className="text-4xl font-black mb-2 tracking-tight">NégoMaster</h1>
        <p className="text-brand-200 text-lg mb-8 font-medium">
          Le Duolingo de la Négociation B2B
        </p>

        {/* Value props */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-5 mb-8 text-left space-y-3">
          {[
            { icon: '🎯', text: 'Parcours adaptatif de Junior à Key Account Manager' },
            { icon: '⚡', text: 'Micro-leçons de 5 min avec feedback immédiat' },
            { icon: '🎭', text: 'Simulations réalistes avec acheteurs virtuels' },
            { icon: '🏆', text: 'XP, badges et streak quotidien' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <span className="text-2xl">{icon}</span>
              <span className="text-brand-100 text-sm font-medium">{text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <button
            onClick={onStart}
            className="w-full bg-white text-brand-700 font-black text-lg py-4 rounded-2xl shadow-xl hover:bg-brand-50 transition-all active:scale-95"
          >
            Commencer le test de niveau
          </button>
          {hasSave && (
            <button
              onClick={onContinue}
              className="w-full bg-white/20 text-white font-bold text-base py-3 rounded-2xl hover:bg-white/30 transition-all active:scale-95"
            >
              Reprendre mon parcours
            </button>
          )}
        </div>

        <p className="text-brand-300 text-xs mt-6">
          Données sauvegardées localement · Aucun compte requis
        </p>
      </div>
    </div>
  )
}
