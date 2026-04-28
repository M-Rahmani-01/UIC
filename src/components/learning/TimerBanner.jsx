import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Timer, Youtube, RefreshCw } from 'lucide-react'

export default function TimerBanner({ youtubeLinks = [], onRetry, initialMinutes = 60 }) {
  const [seconds, setSeconds] = useState(initialMinutes * 60)
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    if (seconds <= 0) {
      setExpired(true)
      return
    }
    const interval = setInterval(() => setSeconds(s => s - 1), 1000)
    return () => clearInterval(interval)
  }, [seconds])

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6"
    >
      {/* Timer */}
      <div className="glass-card border-yellow-500/30 p-5 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <Timer className="w-5 h-5 text-yellow-400" />
          <h3 className="text-white font-bold">Study Break Timer</h3>
        </div>

        <div className={`text-4xl font-mono font-black text-center py-3 ${expired ? 'text-red-400' : seconds < 300 ? 'text-red-400' : 'text-yellow-400'}`}>
          {expired ? 'Time\'s Up!' : formatTime(seconds)}
        </div>

        <p className="text-gray-400 text-sm text-center mt-2">
          {expired
            ? "Let's start fresh! Time to review the concept."
            : 'Take this time to watch the videos below and study the concept.'}
        </p>
      </div>

      {/* YouTube links */}
      {youtubeLinks.length > 0 && (
        <div className="space-y-3 mb-4">
          <p className="text-sm text-gray-400 font-semibold flex items-center gap-2">
            <Youtube className="w-4 h-4 text-red-400" />
            Recommended Study Videos:
          </p>
          {youtubeLinks.map((link, i) => (
            <motion.a
              key={i}
              href={typeof link === 'string' ? link : link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 glass-card p-3 hover:border-red-500/30 transition-all"
            >
              <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                <Youtube className="w-4 h-4 text-red-400" />
              </div>
              <span className="text-sm text-gray-300">Study Video {i + 1}</span>
            </motion.a>
          ))}
        </div>
      )}

      {/* Retry button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRetry}
        className="w-full btn-primary flex items-center justify-center gap-2 py-4"
      >
        <RefreshCw className="w-5 h-5" />
        I've Studied — Try Again! 💪
      </motion.button>
    </motion.div>
  )
}