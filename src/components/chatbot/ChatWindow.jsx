import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, X, Bot, Minimize2 } from 'lucide-react'
import useChatStore from '../../store/useChatStore'
import ChatMessage from './ChatMessage'
import toast from 'react-hot-toast'

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY

export default function ChatWindow({ systemPrompt = null }) {
  const [input, setInput] = useState('')
  const { messages, isOpen, isLoading, addMessage, setLoading, closeChat } = useChatStore()
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const debounceRef = useRef(null)

  const defaultSystem = `You are UIC Bot 🤖, a friendly coding tutor for complete beginners on United Indian Coders platform — India's top free coding education site. 

Your personality:
- Super encouraging, warm, and patient
- Use simple language, avoid jargon
- Give hints, NEVER full solutions
- Celebrate small wins enthusiastically
- Hinglish is totally okay (mix Hindi and English naturally)
- Use emojis occasionally to stay friendly
- Always end with encouragement

Rules:
- Never give direct code answers — always guide with hints
- Break down problems into tiny steps
- If stuck, suggest re-reading the article
- Keep responses concise (2-4 sentences max unless explaining a concept)`

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addMessage({
        role: 'assistant',
        content: "Namaste! 🙏 I'm UIC Bot, your coding buddy! Ask me anything about the problem you're solving. Main hamesha yahan hoon! 💪",
      })
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || isLoading) return

    setInput('')
    addMessage({ role: 'user', content: text })
    setLoading(true)

    try {
      const chatMessages = [
        ...messages.filter(m => m.role !== 'assistant' || messages.indexOf(m) > 0),
        { role: 'user', content: text },
      ].map(m => ({ role: m.role, content: m.content }))

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: systemPrompt || defaultSystem,
          messages: chatMessages.filter(m => m.role === 'user' || m.role === 'assistant'),
        }),
      })

      if (!response.ok) throw new Error('API error')

      const data = await response.json()
      const botReply = data.content?.[0]?.text || "Oops! Something went wrong. Please try again 🙏"
      addMessage({ role: 'assistant', content: botReply })
    } catch (err) {
      addMessage({
        role: 'assistant',
        content: "Arre yaar! Network issue aa gaya. Please check your internet and try again! 🙏",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(handleSend, 300)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-24 right-6 z-40 w-80 sm:w-96 flex flex-col"
          style={{ maxHeight: '500px' }}
        >
          <div className="glass-card flex flex-col overflow-hidden shadow-2xl" style={{ height: '480px' }}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-saffron-500/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-saffron-500 rounded-xl flex items-center justify-center text-lg">
                  🤖
                </div>
                <div>
                  <p className="text-white font-bold text-sm">UIC Bot</p>
                  <p className="text-saffron-400 text-xs">Always here to help!</p>
                </div>
              </div>
              <button
                onClick={closeChat}
                className="text-gray-400 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 justify-start"
                >
                  <div className="w-7 h-7 rounded-lg bg-saffron-500/20 border border-saffron-500/30 flex items-center justify-center text-sm flex-shrink-0">
                    🤖
                  </div>
                  <div className="bg-gray-800 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1 items-center h-4">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-saffron-400 rounded-full"
                          animate={{ y: [0, -6, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-saffron-500 transition-colors"
                  disabled={isLoading}
                  aria-label="Chat input"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 bg-saffron-500 hover:bg-saffron-600 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}