import { motion } from 'framer-motion'
import { Terminal, CheckCircle, XCircle } from 'lucide-react'

export default function OutputTerminal({ output, isCorrect, hasRun }) {
  return (
    <div className="bg-gray-950 rounded-2xl overflow-hidden border border-white/10">
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-green-400" />
          <span className="text-gray-400 text-xs font-sans">Output Terminal</span>
        </div>
        {hasRun && (
          <div className={`flex items-center gap-1 text-xs font-semibold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
            {isCorrect ? (
              <><CheckCircle className="w-4 h-4" /> Correct!</>
            ) : (
              <><XCircle className="w-4 h-4" /> Wrong Answer</>
            )}
          </div>
        )}
      </div>

      {/* Terminal output */}
      <div className="p-4 min-h-[120px] font-mono text-sm">
        {!hasRun && (
          <p className="text-gray-600">// Run your code to see output here...</p>
        )}
        {hasRun && output && (
          <motion.pre
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`whitespace-pre-wrap break-words leading-relaxed ${isCorrect ? 'text-green-400' : 'text-gray-300'}`}
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {output}
          </motion.pre>
        )}
      </div>
    </div>
  )
}