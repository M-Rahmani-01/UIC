import { motion } from 'framer-motion'

export default function BadgeCard({ badge, earned = false }) {
  return (
    <motion.div
      whileHover={earned ? { scale: 1.05 } : {}}
      className={`glass-card p-4 text-center transition-all ${!earned ? 'opacity-40 grayscale' : 'border-yellow-500/20'}`}
    >
      <div className={`text-4xl mb-2 ${earned ? '' : 'grayscale'}`}>{badge.emoji}</div>
      <p className={`text-sm font-bold ${earned ? 'text-white' : 'text-gray-500'}`}>{badge.title}</p>
      <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
      {earned && (
        <div className="mt-2 text-xs text-yellow-400 font-semibold">✓ Earned</div>
      )}
    </motion.div>
  )
}