import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Trophy, LogOut, ChevronDown, Settings } from 'lucide-react'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import useAuthStore from '../../store/useAuthStore'
import toast from 'react-hot-toast'

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false)
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    toast.success('Logged out! See you soon 👋')
    navigate('/')
  }

  const initials = user?.name?.slice(0, 2).toUpperCase() || 'UC'

  return (
    <div ref={ref} className="relative profile-icon">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-3 py-2 transition-all"
        aria-label="Profile menu"
      >
        <div className="w-7 h-7 bg-saffron-500 rounded-lg flex items-center justify-center text-xs font-bold text-white">
          {initials}
        </div>
        <span className="text-sm text-white font-medium hidden sm:block">
          {user?.name?.split(' ')[0]}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-52 glass-card py-2 shadow-2xl z-50"
          >
            <div className="px-4 py-2 border-b border-white/10">
              <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Trophy className="w-4 h-4 text-saffron-400" />
              My Certificates
            </Link>
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <User className="w-4 h-4 text-blue-400" />
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}