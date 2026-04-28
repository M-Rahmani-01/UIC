import { motion } from 'framer-motion'
import Navbar from '../components/navbar/Navbar'
import StepperBar from '../components/learning/StepperBar'

export default function LearningLayout({ children, currentStep, langId, topicId }) {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Navbar />
      {currentStep !== undefined && (
        <StepperBar currentStep={currentStep} langId={langId} topicId={topicId} />
      )}
      <motion.main
        className="flex-1"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
      <footer className="text-center py-4 text-gray-500 text-xs border-t border-white/5">
        © 2025 United Indian Coders | Made with ❤️ in India 🇮🇳
      </footer>
    </div>
  )
}