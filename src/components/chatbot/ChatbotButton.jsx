import { motion } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import useChatStore from '../../store/useChatStore'

export default function ChatbotButton() {
  const { toggleChat, isOpen } = useChatStore()

  return (
    <motion.button
      onClick={toggleChat}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="chatbot-button fixed bottom-6 right-6 z-40 w-14 h-14 bg-saffron-500 hover:bg-saffron-600 text-white rounded-full shadow-2xl shadow-saffron-500/40 flex items-center justify-center transition-colors"
      aria-label="Open AI chatbot"
    >
      <motion.div
        animate={{ rotate: isOpen ? 90 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.div>

      {/* Pulse ring */}
      {!isOpen && (
        <motion.div
          className="absolute inset-0 rounded-full bg-saffron-500"
          animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      )}
    </motion.button>
  )
}