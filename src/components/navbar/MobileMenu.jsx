import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import useAuthStore from '../../store/useAuthStore'
import { Home, BookOpen, User, LogIn, UserPlus, LogOut } from 'lucide-react'
import toast from 'react-hot-toast'

export default function MobileMenu({ isOpen, onClose }) {
  const { isAuthenticated, user } = useAuthStore()

  const handleLogout = async () => {
    await signOut(auth)
    toast.success('Logged out!')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-gray-900/95 backdrop-blur-lg border-t border-white/10 overflow-hidden"
        >
          <div className="px-4 py-4 space-y-1">
            {isAuthenticated && (
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl mb-3">
                <div className="w-9 h-9 bg-saffron-500 rounded-lg flex items-center justify-center font-bold text-white text-sm">
                  {user?.name?.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{user?.name}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
              </div>
            )}

            <Link to="/" onClick={onClose} className="flex items-center gap-3 p-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
              <Home className="w-5 h-5 text-saffron-400" />
              Home
            </Link>
            <Link to="/learn/python" onClick={onClose} className="flex items-center gap-3 p-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
              <BookOpen className="w-5 h-5 text-green-400" />
              Learn
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={onClose} className="flex items-center gap-3 p-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                  <User className="w-5 h-5 text-blue-400" />
                  Profile
                </Link>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 text-red-400 hover:bg-white/5 rounded-xl transition-colors">
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={onClose} className="flex items-center gap-3 p-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                  <LogIn className="w-5 h-5 text-saffron-400" />
                  Login
                </Link>
                <Link to="/signup" onClick={onClose} className="block">
                  <button className="w-full btn-primary text-sm py-3 mt-1">
                    Start Free 🚀
                  </button>
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}