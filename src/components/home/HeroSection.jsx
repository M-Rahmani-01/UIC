import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles } from 'lucide-react'

const WORDS = ['Python', 'Java', 'C++', 'JavaScript', 'SQL', 'HTML', 'DSA']

export default function HeroSection() {
  const canvasRef = useRef(null)
  const [wordIdx, setWordIdx] = useState(0)

  // Word rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx(i => (i + 1) % WORDS.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 107, 0, ${p.alpha})`
        ctx.fill()

        // Draw lines between close particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x
          const dy = particles[j].y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255, 107, 0, ${0.05 * (1 - dist / 100)})`
            ctx.stroke()
          }
        }
      })
      animationId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        id="particle-canvas"
        className="absolute inset-0 w-full h-full"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/30 to-gray-950" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-saffron-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-saffron-500/10 border border-saffron-500/30 rounded-full px-4 py-2 text-sm text-saffron-400 font-semibold mb-8"
        >
          <Sparkles className="w-4 h-4" />
          India's #1 Free Coding Platform
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-heading font-black text-5xl sm:text-6xl md:text-7xl text-white leading-tight mb-4"
        >
          Welcome to{' '}
          <span className="block text-gradient">United Indian</span>
          <span className="block">Coders</span>
        </motion.h1>

        {/* Animated word */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl sm:text-3xl text-gray-300 font-semibold mb-3 h-10 flex items-center justify-center gap-2"
        >
          Learn{' '}
          <motion.span
            key={wordIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-saffron-400 min-w-[120px] text-left"
          >
            {WORDS[wordIdx]}
          </motion.span>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg text-gray-400 mb-10 max-w-xl mx-auto"
        >
          From Zero to Pro. For Free. In Hindi & English. 🇮🇳
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2 text-base px-8 py-4 glow-saffron"
            >
              Start Learning Free
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
          <Link to="/learn/python">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary flex items-center gap-2 text-base px-8 py-4"
            >
              <Play className="w-5 h-5 text-saffron-400" />
              Explore Languages
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex items-center justify-center gap-8 mt-12 text-sm text-gray-500"
        >
          {[['8+', 'Languages'], ['50+', 'Topics'], ['100%', 'Free']].map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-black text-saffron-400 font-heading">{val}</div>
              <div>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}