import { motion } from 'framer-motion'
import ProblemCard from './ProblemCard'

export default function ProblemsGrid({ problems = [], completedProblems = [], unlockedIndex = 0, langId, topicId }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-white mb-2">
          Practice Problems 💻
        </h2>
        <p className="text-gray-400">
          Solve problems in order. Each one unlocks the next!
        </p>
      </div>

      <div className="space-y-4">
        {problems.map((problem, idx) => {
          const isCompleted = completedProblems.includes(problem.id)
          const isUnlocked = idx <= unlockedIndex || isCompleted
          return (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <ProblemCard
                problem={problem}
                isCompleted={isCompleted}
                isUnlocked={isUnlocked}
                index={idx + 1}
                langId={langId}
                topicId={topicId}
              />
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}