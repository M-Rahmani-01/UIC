import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, BookOpen } from 'lucide-react'
import SpeakerButton from '../ui/SpeakerButton'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

export default function ArticleReader({ article, title, onMarkRead, isRead }) {
  const [reading, setReading] = useState(false)

  // Process article text: wrap code blocks with syntax highlighting
  const processArticle = (text) => {
    return text.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
      const highlighted = lang
        ? hljs.highlight(code.trim(), { language: lang, ignoreIllegals: true }).value
        : hljs.highlightAuto(code.trim()).value
      return `<pre class="rounded-xl overflow-x-auto my-4"><code class="hljs language-${lang || 'plaintext'} block p-4 text-sm leading-relaxed">${highlighted}</code></pre>`
    })
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/`(.*?)`/g, '<code class="bg-white/10 px-1.5 py-0.5 rounded text-saffron-400 text-sm font-mono">$1</code>')
      .replace(/^## (.*)/gm, '<h2 class="text-xl font-heading font-bold text-white mt-6 mb-3">$1</h2>')
      .replace(/^### (.*)/gm, '<h3 class="text-lg font-heading font-semibold text-saffron-400 mt-4 mb-2">$1</h3>')
      .replace(/\n\n/g, '<br/><br/>')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-saffron-500/20 rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-saffron-400" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">{title}</h1>
            <p className="text-gray-400 text-sm">Read carefully, then mark as read</p>
          </div>
        </div>
        <SpeakerButton text={article.replace(/```[\s\S]*?```/g, 'code block').replace(/[#*`]/g, '')} className="speaker-button" />
      </div>

      {/* Article Content */}
      <div
        className="glass-card p-6 sm:p-8 prose prose-invert max-w-none text-gray-300 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: processArticle(article) }}
      />

      {/* Mark as Read */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex justify-center"
      >
        {isRead ? (
          <div className="flex items-center gap-2 text-green-400 font-semibold">
            <CheckCircle className="w-6 h-6" />
            Article completed!
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMarkRead}
            className="btn-primary flex items-center gap-2 px-8 py-4"
          >
            <CheckCircle className="w-5 h-5" />
            Mark as Read — Unlock Next Step
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  )
}