import { motion } from 'framer-motion'
import { Code2 } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gray-950 flex flex-col items-center justify-center z-50">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
        className="w-16 h-16 bg-saffron-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-saffron-500/40 mb-6"
      >
        <Code2 className="w-9 h-9 text-white" />
      </motion.div>

      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-gray-400 font-semibold text-sm tracking-wider"
      >
        Loading United Indian Coders...
      </motion.p>

      {/* Skeleton bars */}
      <div className="mt-8 space-y-3 w-64">
        {[100, 80, 60].map((w, i) => (
          <motion.div
            key={i}
            className="skeleton h-3 rounded-full"
            style={{ width: `${w}%` }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  )
}