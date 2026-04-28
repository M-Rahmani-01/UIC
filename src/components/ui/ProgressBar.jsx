import { motion } from 'framer-motion'

export default function ProgressBar({ percent = 0, label, color = '#FF6B00', showLabel = true }) {
  const safePercent = Math.min(100, Math.max(0, percent))

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm text-gray-400">{label}</span>}
          <span className="text-sm font-bold text-white ml-auto">{safePercent}%</span>
        </div>
      )}
      <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${safePercent}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}CC)` }}
        />
      </div>
    </div>
  )
}
