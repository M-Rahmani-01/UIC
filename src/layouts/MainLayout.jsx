import { motion } from 'framer-motion'
import Navbar from '../components/navbar/Navbar'

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Navbar />
      <motion.main
        className="flex-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
      <footer className="text-center py-6 text-gray-400 text-sm border-t border-white/5">
        <p>© 2025 United Indian Coders | Made with ❤️ in India 🇮🇳</p>
        <p className="text-xs mt-1 text-gray-500">Learn Coding. From Zero to Pro. For Free.</p>
      </footer>
    </div>
  )
}