import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, CheckCircle, ExternalLink } from 'lucide-react'

export default function VideoSection({ title, youtubeLinks = [], onMarkWatched, isWatched }) {
  const [watching, setWatching] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-white mb-2">
          Watch & Learn 🎬
        </h2>
        <p className="text-gray-400">Watch these video lessons for a better understanding</p>
      </div>

      {/* Video placeholder */}
      <div className="glass-card p-6 mb-6">
        <div className="bg-gray-900 rounded-2xl aspect-video flex items-center justify-center border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-saffron-500/5 to-transparent" />
          <div className="text-center relative z-10">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-20 h-20 bg-saffron-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-saffron-500/40"
            >
              <Play className="w-9 h-9 text-white ml-1" />
            </motion.div>
            <p className="text-white font-semibold text-lg">{title}</p>
            <p className="text-gray-400 text-sm mt-1">Click a video link below to watch</p>
          </div>
        </div>
      </div>

      {/* YouTube Links */}
      <div className="space-y-3 mb-8">
        {youtubeLinks.map((link, i) => (
          <motion.a
            key={i}
            href={typeof link === 'string' ? link : link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-4 glass-card p-4 hover:border-saffron-500/30 transition-all group"
          >
            <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Play className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">
                {typeof link === 'string' ? `Video Tutorial ${i + 1}` : link.title}
              </p>
              <p className="text-gray-500 text-xs">YouTube • Open in new tab</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-saffron-400 transition-colors flex-shrink-0" />
          </motion.a>
        ))}

        {youtubeLinks.length === 0 && (
          <div className="glass-card p-6 text-center text-gray-400">
            <Play className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p>Video lessons coming soon!</p>
          </div>
        )}
      </div>

      {/* Mark as Watched */}
      <div className="flex justify-center">
        {isWatched ? (
          <div className="flex items-center gap-2 text-green-400 font-semibold">
            <CheckCircle className="w-6 h-6" />
            Marked as watched!
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMarkWatched}
            className="btn-primary flex items-center gap-2 px-8 py-4"
          >
            <CheckCircle className="w-5 h-5" />
            I've Watched — Unlock Problems
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}