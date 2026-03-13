import React, { useEffect, useState } from 'react'
import { BADGES } from '../data/badges.js'

export default function BadgeNotification({ newBadges, onDismiss }) {
  const [visible, setVisible] = useState(false)
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (newBadges && newBadges.length > 0) {
      setIdx(0)
      setVisible(true)
    }
  }, [newBadges])

  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(() => {
      if (idx < newBadges.length - 1) {
        setIdx(i => i + 1)
      } else {
        setVisible(false)
        onDismiss()
      }
    }, 3000)
    return () => clearTimeout(timer)
  }, [visible, idx, newBadges])

  if (!visible || !newBadges || newBadges.length === 0) return null

  const badge = BADGES.find(b => b.id === newBadges[idx])
  if (!badge) return null

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-bounce-in">
      <div className="bg-gray-900 text-white rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-4 min-w-[280px]">
        <div className="text-4xl">{badge.icon}</div>
        <div>
          <p className="text-xs font-bold text-yellow-400 uppercase">Nouveau Badge !</p>
          <p className="font-black text-lg">{badge.label}</p>
          <p className="text-xs text-gray-400">{badge.description}</p>
        </div>
      </div>
    </div>
  )
}
