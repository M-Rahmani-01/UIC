import { motion } from 'framer-motion'
import { BookOpen, Play, Code, Trophy } from 'lucide-react'

const STEPS = [
  { id: 1, label: 'Read', icon: BookOpen },
  { id: 2, label: 'Watch', icon: Play },
  { id: 3, label: 'Practice', icon: Code },
  { id: 4, label: 'Complete', icon: Trophy },
]

export default function StepperBar({ currentStep = 1 }) {
  return (
    <div className="stepper-bar bg-gray-900/80 backdrop-blur border-b border-white/10 py-4 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between relative">
          {/* Progress line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10 z-0">
            <motion.div
              className="h-full bg-saffron-500"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {STEPS.map((step) => {
            const Icon = step.icon
            const isCompleted = step.id < currentStep
            const isCurrent = step.id === currentStep
            const isLocked = step.id > currentStep

            return (
              <div key={step.id} className="flex flex-col items-center relative z-10">
                <motion.div
                  whileHover={!isLocked ? { scale: 1.1 } : {}}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${isCompleted ? 'bg-saffron-500 shadow-lg shadow-saffron-500/30' : ''}
                    ${isCurrent ? 'bg-saffron-500 ring-4 ring-saffron-500/30 shadow-lg shadow-saffron-500/40' : ''}
                    ${isLocked ? 'bg-gray-800 border border-white/10' : ''}
                  `}
                >
                  <Icon className={`w-5 h-5 ${isLocked ? 'text-gray-600' : 'text-white'}`} />
                </motion.div>
                <span className={`text-xs mt-2 font-semibold hidden sm:block transition-colors
                  ${isCurrent ? 'text-saffron-400' : isCompleted ? 'text-white' : 'text-gray-600'}
                `}>
                  {step.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}