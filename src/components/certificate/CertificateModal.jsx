import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Share2, Lock } from 'lucide-react'
import CertificateCard from './CertificateCard'
import { generateCertificate } from '../../utils/generateCertificate'
import useAuthStore from '../../store/useAuthStore'
import toast from 'react-hot-toast'

export default function CertificateModal({ isOpen, onClose, certData, onSave }) {
  const [downloading, setDownloading] = useState(false)
  const { isAuthenticated, user } = useAuthStore()

  const handleDownload = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to download your certificate!')
      return
    }
    setDownloading(true)
    try {
      await generateCertificate(certData.problemTitle)
      await onSave?.()
      toast.success('Certificate downloaded! 🎉')
    } catch (err) {
      toast.error('Download failed. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.8, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="glass-card p-6 max-w-3xl w-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-heading font-black text-white">🎉 You Did It!</h2>
                <p className="text-gray-400 text-sm mt-1">Your certificate is ready to download</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-xl transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Certificate Preview */}
            <div className={`relative overflow-hidden rounded-xl mb-6 ${!isAuthenticated ? 'select-none' : ''}`}>
              <div className="overflow-x-auto">
                <div style={{ transform: 'scale(0.65)', transformOrigin: 'top left', width: '800px', height: '560px' }}>
                  <CertificateCard
                    userName={user?.name || 'Guest User'}
                    problemTitle={certData?.problemTitle || 'Problem'}
                    language={certData?.language || 'Programming'}
                    certId={certData?.certId || `UIC-${Date.now()}`}
                    date={certData?.date}
                  />
                </div>
              </div>
              <div style={{ height: '364px' }} />

              {/* Blur overlay for non-logged-in users */}
              {!isAuthenticated && (
                <div className="absolute inset-0 bg-gray-950/60 backdrop-blur-md flex items-center justify-center rounded-xl">
                  <div className="text-center">
                    <Lock className="w-10 h-10 text-saffron-400 mx-auto mb-3" />
                    <p className="text-white font-bold mb-1">Login to Unlock Certificate</p>
                    <p className="text-gray-400 text-sm">Create a free account to download this certificate</p>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-center flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                disabled={downloading || !isAuthenticated}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5" />
                {downloading ? 'Generating PDF...' : 'Download Certificate'}
              </motion.button>
              {!isAuthenticated && (
                <motion.a
                  href="/signup"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary flex items-center gap-2"
                >
                  Create Free Account
                </motion.a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}