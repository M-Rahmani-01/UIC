import { motion } from 'framer-motion'

export default function ChatMessage({ message }) {
  const isBot = message.role === 'assistant'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex gap-2 ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      {isBot && (
        <div className="w-7 h-7 rounded-lg bg-saffron-500/20 border border-saffron-500/30 flex items-center justify-center text-sm flex-shrink-0 mt-1">
          🤖
        </div>
      )}
      <div
        className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed
          ${isBot
            ? 'bg-gray-800 text-gray-200 rounded-tl-sm border border-white/10'
            : 'bg-saffron-500 text-white rounded-tr-sm'
          }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        <p className={`text-xs mt-1 ${isBot ? 'text-gray-500' : 'text-saffron-200'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </motion.div>
  )
}