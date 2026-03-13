import { useEffect, useState } from 'react'

export default function XPPopup({ amount, onDone }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      onDone?.()
    }, 1200)
    return () => clearTimeout(t)
  }, [onDone])

  if (!visible) return null

  return (
    <div className="fixed top-24 right-6 z-50 pointer-events-none animate-xp-pop">
      <div className="bg-xp-gold text-white font-display font-black text-xl px-4 py-2 rounded-2xl shadow-lg">
        +{amount} XP ⭐
      </div>
    </div>
  )
}
