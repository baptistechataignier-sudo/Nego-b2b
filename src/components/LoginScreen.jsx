import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError('')

    const redirectTo = window.location.origin + import.meta.env.BASE_URL

    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { emailRedirectTo: redirectTo },
    })

    if (err) {
      setError("Erreur lors de l'envoi. Vérifiez l'adresse email.")
      setLoading(false)
    } else {
      setSent(true)
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="text-6xl mb-4">📬</div>
        <h2 className="font-display font-black text-2xl text-brand-700 mb-2">Vérifiez vos emails</h2>
        <p className="text-gray-500 mb-1">Un lien de connexion a été envoyé à</p>
        <p className="font-semibold text-gray-800 mb-6">{email}</p>
        <p className="text-sm text-gray-400">Cliquez sur le lien pour accéder à NégoMaster.</p>
        <button
          onClick={() => { setSent(false); setLoading(false) }}
          className="mt-8 text-sm text-brand-600 hover:underline"
        >
          Utiliser une autre adresse
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-10">
        <div className="text-5xl mb-3">🤝</div>
        <h1 className="font-display font-black text-4xl text-brand-700">NégoMaster</h1>
        <p className="text-gray-500 mt-2 text-sm">Formation à la négociation B2B</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Adresse email
          </label>
          <input
            type="email"
            placeholder="vous@entreprise.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 text-base focus:border-brand-400 focus:outline-none transition-colors"
            autoFocus
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={!email.trim() || loading}
          className="w-full bg-brand-600 text-white rounded-2xl py-4 font-bold text-base disabled:opacity-50 hover:bg-brand-700 transition-colors"
        >
          {loading ? 'Envoi en cours...' : 'Recevoir mon lien de connexion →'}
        </button>
      </form>

      <p className="text-xs text-gray-400 mt-10">
        Pas de mot de passe — un lien sécurisé est envoyé par email
      </p>
    </div>
  )
}
