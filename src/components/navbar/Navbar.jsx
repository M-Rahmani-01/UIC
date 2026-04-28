import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Code2, Menu, X } from 'lucide-react'
import useAuthStore from '../../store/useAuthStore'
import ProfileDropdown from './ProfileDropdown'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  return (
    <nav className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="navbar-logo flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-9 h-9 bg-saffron-500 rounded-xl flex items-center justify-center shadow-lg shadow-saffron-500/30"
            >
              <Code2 className="w-5 h-5 text-white" />
            </motion.div>
            <div className="hidden sm:block">
              <span className="font-heading font-bold text-white text-lg leading-none">
                United Indian
              </span>
              <span className="block text-xs text-saffron-400 font-semibold tracking-wider uppercase">
                Coders
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Home
            </Link>
            <Link to="/learn/python" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Learn
            </Link>
            {isAuthenticated ? (
              <ProfileDropdown />
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm text-gray-300 hover:text-white transition-colors font-medium"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary text-sm py-2 px-4"
                  >
                    Start Free
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </nav>
  )
}