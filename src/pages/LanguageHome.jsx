import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Unlock, Clock, ArrowRight, Star } from 'lucide-react'
import MainLayout from '../layouts/MainLayout'
import { getLanguage } from '../data/languages'
import useAuthStore from '../store/useAuthStore'
import useProgressStore from '../store/useProgressStore'
import ProgressBar from '../components/ui/ProgressBar'

export default function LanguageHome() {
  const { lang } = useParams()
  const langConfig = getLanguage(lang)
  const { isAuthenticated } = useAuthStore()
  const { getLanguageProgress } = useProgressStore()

  if (!langConfig) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🤔</div>
            <h1 className="text-2xl font-bold text-white mb-2">Language not found!</h1>
            <Link to="/" className="btn-primary">Go Home</Link>
          </div>
        </div>
      </MainLayout>
    )
  }

  const progress = getLanguageProgress(lang)
  const completedTopics = progress.completedTopics || []
  const percentComplete = progress.percentComplete || 0

  const DIFFICULTY_ORDER = {
    Beginner: 0,
    Intermediate: 1,
    Advanced: 2,
    Pro: 3,
  }

  return (
    <MainLayout>
      {/* Hero Banner */}
      <section
        className="relative py-20 px-4 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${langConfig.theme.bg}, ${langConfig.theme.primary}40)` }}
      >
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 30% 50%, ${langConfig.theme.accent}15, transparent 70%)` }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-28 h-28 rounded-3xl flex items-center justify-center text-6xl shadow-2xl flex-shrink-0"
              style={{ background: `${langConfig.theme.accent}20`, border: `2px solid ${langConfig.theme.accent}40` }}
            >
              {langConfig.logo}
            </motion.div>

            <div className="text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                style={{ background: `${langConfig.theme.accent}20`, color: langConfig.theme.accent }}
              >
                {langConfig.topics.length} Topics Available
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-heading font-black text-5xl text-white mb-2"
              >
                {langConfig.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-300 text-lg mb-4"
              >
                {langConfig.tagline}
              </motion.p>

              {isAuthenticated && (
                <div className="max-w-xs">
                  <ProgressBar percent={percentComplete} label="Overall Progress" color={langConfig.theme.accent} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading font-black text-3xl text-white mb-2 text-center"
        >
          Learning Path 🗺️
        </motion.h2>
        <p className="text-gray-400 text-center mb-10">
          Complete topics in order to unlock the next level!
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {langConfig.topics.map((topicId, idx) => {
            const isFirst = idx === 0
            const isCompleted = completedTopics.includes(topicId)
            const isUnlocked = isFirst || isCompleted ||
              (idx > 0 && completedTopics.includes(langConfig.topics[idx - 1]))

            const topicLabel = topicId.charAt(0).toUpperCase() + topicId.slice(1).replace(/-/g, ' ')

            return (
              <motion.div
                key={topicId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
              >
                {isUnlocked ? (
                  <Link to={`/learn/${lang}/${topicId}`}>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`glass-card p-5 cursor-pointer group relative overflow-hidden
                        ${isCompleted ? 'border-green-500/20' : ''}
                        ${isFirst && !isCompleted ? 'glow-saffron border-saffron-500/40' : ''}
                      `}
                    >
                      {isFirst && !isCompleted && (
                        <div className="absolute top-3 right-3 text-xs bg-saffron-500 text-white px-2 py-0.5 rounded-full font-bold">
                          START HERE!
                        </div>
                      )}
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isCompleted ? 'bg-green-500/20' : 'bg-white/5'}`}
                          style={!isCompleted ? { background: `${langConfig.theme.accent}15` } : {}}>
                          {isCompleted ? '✅' : <Unlock className="w-5 h-5" style={{ color: langConfig.theme.accent }} />}
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-sm group-hover:text-saffron-400 transition-colors">
                            {topicLabel}
                          </h3>
                          <p className="text-xs text-gray-500">Topic {idx + 1}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        {isCompleted ? (
                          <span className="text-xs text-green-400 font-semibold">✓ Completed</span>
                        ) : (
                          <span className="text-xs" style={{ color: langConfig.theme.accent }}>
                            {isFirst ? 'Click to start!' : 'Ready to learn'}
                          </span>
                        )}
                        <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-saffron-400 transition-colors" />
                      </div>
                    </motion.div>
                  </Link>
                ) : (
                  <div className="glass-card p-5 opacity-50 cursor-not-allowed">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-500 text-sm">{topicLabel}</h3>
                        <p className="text-xs text-gray-600">Complete previous topic first</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-600">🔒 Locked</span>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 glass-card p-6 text-center border-saffron-500/20"
          >
            <p className="text-gray-300 mb-4">
              🔐 <strong className="text-white">Login to track your progress</strong> and unlock more topics!
            </p>
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Create Free Account 🚀
              </motion.button>
            </Link>
          </motion.div>
        )}
      </section>
    </MainLayout>
  )
}