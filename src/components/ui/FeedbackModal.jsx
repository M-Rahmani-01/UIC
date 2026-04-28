import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Send } from 'lucide-react'
import { saveFeedback } from '../../firebase/helpers'
import useAuthStore from '../../store/useAuthStore'
import toast from 'react-hot-toast'

export default function FeedbackModal({ isOpen, onClose, problemId }) {
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useAuthStore()

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Please give a star rating!')
      return
    }
    setLoading(true)
    try {
      await saveFeedback({
        userId: user?.uid || 'guest',
        problemId,
        message,
        rating,
      })
      toast.success('Thanks for your feedback! 🙏')
      onClose()
    } catch {
      toast.error('Could not save feedback.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="glass-card p-6 w-full max-w-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">How was this problem? 😊</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stars */}
            <div className="flex gap-2 justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setRating(star)}
                  className={`text-3xl transition-colors ${star <= rating ? 'text-yellow-400' : 'text-gray-600'}`}
                  aria-label={`Rate ${star} stars`}
                >
                  ★
                </motion.button>
              ))}
            </div>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Any suggestions? (optional)"
              className="input-field text-sm h-24 resize-none mb-4"
              aria-label="Feedback message"
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}