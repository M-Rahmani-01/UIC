import { ChevronDown } from 'lucide-react'

const LANGUAGES = [
  { value: 'python', label: 'Python 3', emoji: '🐍' },
  { value: 'javascript', label: 'JavaScript', emoji: '🌐' },
  { value: 'c', label: 'C Language', emoji: '🔷' },
  { value: 'cpp', label: 'C++', emoji: '⚡' },
  { value: 'java', label: 'Java', emoji: '☕' },
]

export default function LanguageSelector({ value, onChange }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full bg-gray-800 border border-white/10 text-white text-sm rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:border-saffron-500 cursor-pointer"
        aria-label="Select language"
      >
        {LANGUAGES.map(lang => (
          <option key={lang.value} value={lang.value}>
            {lang.emoji} {lang.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  )
}