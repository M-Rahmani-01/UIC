import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { useSpeech } from '../../hooks/useSpeech'

export default function SpeakerButton({ text, className = '' }) {
  const { toggle, isSpeaking } = useSpeech()

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => toggle(text)}
      className={`speaker-button w-10 h-10 rounded-xl flex items-center justify-center transition-all
        ${isSpeaking
          ? 'bg-saffron-500 text-white shadow-lg shadow-saffron-500/30'
          : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/20'
        } ${className}`}
      aria-label={isSpeaking ? 'Stop reading' : 'Read aloud'}
      title={isSpeaking ? 'Stop' : 'Listen'}
    >
      {isSpeaking ? (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        >
          <Volume2 className="w-5 h-5" />
        </motion.div>
      ) : (
        <VolumeX className="w-5 h-5" />
      )}
    </motion.button>
  )
}