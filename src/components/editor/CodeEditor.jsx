import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, RotateCcw } from 'lucide-react'
import toast from 'react-hot-toast'

export default function CodeEditor({ value, onChange, language = 'python', placeholder = '// Write your code here...' }) {
  const [copied, setCopied] = useState(false)
  const textareaRef = useRef(null)

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.target.selectionStart
      const end = e.target.selectionEnd
      const newValue = value.substring(0, start) + '  ' + value.substring(end)
      onChange(newValue)
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + 2
          textareaRef.current.selectionEnd = start + 2
        }
      }, 0)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    toast.success('Code copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    onChange('')
    textareaRef.current?.focus()
  }

  const lineCount = value.split('\n').length

  return (
    <div className="relative bg-gray-900 rounded-2xl overflow-hidden border border-white/10 font-mono">
      {/* Editor header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="text-gray-400 text-xs ml-2 font-sans">solution.{language === 'python' ? 'py' : language === 'javascript' ? 'js' : language === 'java' ? 'java' : language === 'c' ? 'c' : 'txt'}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg"
            aria-label="Copy code"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={handleReset}
            className="text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg"
            aria-label="Reset code"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Code area */}
      <div className="flex">
        {/* Line numbers */}
        <div className="bg-gray-900 px-3 py-4 text-gray-600 text-xs select-none border-r border-white/5 min-w-[44px] text-right leading-6">
          {Array.from({ length: Math.max(lineCount, 10) }, (_, i) => (
            <div key={i + 1}>{i + 1}</div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          spellCheck={false}
          className="flex-1 bg-transparent text-green-300 text-sm py-4 px-3 resize-none outline-none leading-6 min-h-[280px] placeholder-gray-700"
          style={{ fontFamily: "'JetBrains Mono', monospace", tabSize: 2 }}
          aria-label="Code editor"
        />
      </div>
    </div>
  )
}