import { motion } from 'framer-motion'
import { languages } from '../../data/languages'
import LanguageCard from './LanguageCard'
import React from 'react'

const MemoCard = React.memo(LanguageCard)

export default function LanguageGrid() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto language-grid">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="font-heading font-black text-4xl text-white mb-3">
          Choose Your <span className="text-gradient">Language</span>
        </h2>
        <p className="text-gray-400 text-lg">
          Pick any language and start your coding journey today!
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {languages.map((lang, idx) => (
          <motion.div
            key={lang.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
          >
            <MemoCard lang={lang} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}