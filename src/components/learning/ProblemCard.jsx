import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, CheckCircle, Clock, ChevronRight, Zap } from 'lucide-react'

const DIFFICULTY_COLORS = {
  Easy: 'text-green-400 bg-green-400/10',
  Medium: 'text-yellow-400 bg-yellow-400/10',
  Hard: 'text-red-400 bg-red-400/10',
}

export default function ProblemCard({ problem, isCompleted, isUnlocked, index, langId, topicId }) {
  const content = (
    <motion.div
      whileHover={isUnlocked ? { scale: 1.02 } : {}}
      whileTap={isUnlocked ? { scale: 0.98 } : {}}
      className={`glass-card p-4 sm:p-5 transition-all duration-300 relative overflow-hidden
        ${isCompleted ? 'border-green-500/30 bg-green-500/5' : ''}
        ${!isUnlocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-saffron-500/30'}
        ${isUnlocked && !isCompleted ? 'hover:shadow-lg hover:shadow-saffron-500/10' : ''}
      `}
    >
      {!isUnlocked && (
        <div className="absolute inset-0 bg-gray-950/30 backdrop-blur-sm flex items-center justify-center rounded-2xl z-10">
          <div className="flex items-center gap-2 text-gray-400 text-sm font-semibold">
            <Lock className="w-4 h-4" />
            Complete previous problem to unlock
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        {/* Index */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0
          ${isCompleted ? 'bg-green-500/20 text-green-400' : 'bg-saffron-500/20 text-saffron-400'}`}
        >
          {isCompleted ? <CheckCircle className="w-5 h-5" /> : index}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-white font-semibold text-sm">{problem.title}</h3>
            {isCompleted && (
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                ✓ Solved
              </span>
            )}
          </div>
          <p className="text-gray-400 text-xs mt-1 line-clamp-1">{problem.description}</p>
        </div>

        {/* Meta */}
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_COLORS[problem.difficulty] || DIFFICULTY_COLORS.Easy}`}>
            {problem.difficulty}
          </span>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <Clock className="w-3 h-3" />
            {problem.timeLimit} min
          </div>
        </div>

        {isUnlocked && !isCompleted && (
          <ChevronRight className="w-5 h-5 text-gray-600 flex-shrink-0" />
        )}
      </div>
    </motion.div>
  )

  if (isUnlocked) {
    return (
      <Link to={`/learn/${langId}/${topicId}/${problem.id}`}>
        {content}
      </Link>
    )
  }
  return content
}