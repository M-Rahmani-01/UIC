import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const COLORS = ['#FF6B00', '#FFD700', '#52B788', '#4285F4', '#EA4335', '#FBBC05', '#FF69B4']
const PIECES = 80

export default function ConfettiBlast({ active }) {
  const pieces = Array.from({ length: PIECES }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    delay: Math.random() * 0.5,
    duration: 1.5 + Math.random() * 1.5,
    rotate: Math.random() * 360,
    size: 6 + Math.random() * 8,
  }))

  if (!active) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: '110vh', opacity: [1, 1, 0], rotate: p.rotate }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
          className="absolute top-0 rounded-sm"
          style={{
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            left: `${p.x}%`,
          }}
        />
      ))}
    </div>
  )
}