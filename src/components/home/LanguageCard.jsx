import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function LanguageCard({ lang }) {
  return (
    <Link to={`/learn/${lang.id}`} className={`language-card-${lang.id} block`}>
      <motion.div
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.97 }}
        className="glass-card p-5 cursor-pointer group relative overflow-hidden h-full"
        style={{ borderColor: `${lang.theme.accent}30` }}
      >
        {/* Glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `radial-gradient(circle at 50% 50%, ${lang.theme.accent}15, transparent 70%)` }}
        />

        <div className="relative z-10">
          {/* Logo */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg"
            style={{ background: `${lang.theme.accent}20`, border: `1px solid ${lang.theme.accent}30` }}
          >
            {lang.logo}
          </div>

          <h3 className="font-heading font-bold text-white text-lg mb-1 group-hover:text-saffron-400 transition-colors">
            {lang.name}
          </h3>
          <p className="text-gray-400 text-xs line-clamp-2 mb-3">{lang.tagline}</p>

          <div className="flex items-center justify-between">
            <span
              className="text-xs px-2 py-1 rounded-full font-medium"
              style={{ background: `${lang.theme.accent}20`, color: lang.theme.accent }}
            >
              {lang.topics.length} Topics
            </span>
            <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-saffron-400 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}