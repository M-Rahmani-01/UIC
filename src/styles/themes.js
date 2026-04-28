export const languageThemes = {
  c: {
    gradient: 'from-emerald-900 to-emerald-950',
    accent: '#52B788',
    glow: 'shadow-emerald-500/20',
    badge: 'bg-emerald-500/20 text-emerald-400',
  },
  cpp: {
    gradient: 'from-blue-900 to-blue-950',
    accent: '#60a5fa',
    glow: 'shadow-blue-500/20',
    badge: 'bg-blue-500/20 text-blue-400',
  },
  java: {
    gradient: 'from-orange-900 to-orange-950',
    accent: '#f97316',
    glow: 'shadow-orange-500/20',
    badge: 'bg-orange-500/20 text-orange-400',
  },
  python: {
    gradient: 'from-yellow-900 to-yellow-950',
    accent: '#fbbf24',
    glow: 'shadow-yellow-500/20',
    badge: 'bg-yellow-500/20 text-yellow-400',
  },
  javascript: {
    gradient: 'from-yellow-800 to-gray-950',
    accent: '#facc15',
    glow: 'shadow-yellow-500/20',
    badge: 'bg-yellow-500/20 text-yellow-300',
  },
  html: {
    gradient: 'from-red-900 to-red-950',
    accent: '#f87171',
    glow: 'shadow-red-500/20',
    badge: 'bg-red-500/20 text-red-400',
  },
  sql: {
    gradient: 'from-indigo-900 to-indigo-950',
    accent: '#818cf8',
    glow: 'shadow-indigo-500/20',
    badge: 'bg-indigo-500/20 text-indigo-400',
  },
  dsa: {
    gradient: 'from-purple-900 to-purple-950',
    accent: '#c084fc',
    glow: 'shadow-purple-500/20',
    badge: 'bg-purple-500/20 text-purple-400',
  },
}

export const getTheme = (langId) => languageThemes[langId] || languageThemes.python