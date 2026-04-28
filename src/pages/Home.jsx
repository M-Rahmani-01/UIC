import { motion } from 'framer-motion'
import MainLayout from '../layouts/MainLayout'
import HeroSection from '../components/home/HeroSection'
import LanguageGrid from '../components/home/LanguageGrid'
import { Trophy, Target, Flame, Users } from 'lucide-react'

const GOALS = [
  {
    icon: '🎓',
    title: 'Learn at Your Pace',
    desc: 'No deadlines. No pressure. Learn whenever you want, however you want.',
  },
  {
    icon: '🤖',
    title: 'AI-Powered Tutor',
    desc: 'Our UIC Bot guides you in Hindi and English — like having a personal mentor!',
  },
  {
    icon: '🏆',
    title: 'Earn Certificates',
    desc: 'Solve problems and earn real, downloadable certificates to show off!',
  },
  {
    icon: '🇮🇳',
    title: 'Made for India',
    desc: 'Content designed for Indian students. Hindi explanations. Relatable examples.',
  },
]

const STATS = [
  { value: '8+', label: 'Languages', icon: '💻' },
  { value: '100+', label: 'Problems', icon: '🧩' },
  { value: 'Free', label: 'Forever', icon: '❤️' },
  { value: '∞', label: 'Certificates', icon: '🏆' },
]

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />

      {/* Stats Banner */}
      <section className="py-10 bg-saffron-500/5 border-y border-saffron-500/10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl mb-1">{stat.icon}</div>
              <div className="text-3xl font-black text-saffron-400 font-heading">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Language Grid */}
      <LanguageGrid />

      {/* Goals Section */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading font-black text-4xl text-white mb-3">
              Why <span className="text-gradient">United Indian Coders?</span>
            </h2>
            <p className="text-gray-400 text-lg">We built this platform keeping Indian students in mind</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GOALS.map((goal, i) => (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass-card p-6 text-center"
              >
                <div className="text-4xl mb-4">{goal.icon}</div>
                <h3 className="font-heading font-bold text-white text-lg mb-2">{goal.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{goal.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-5xl mb-6">🚀</div>
          <h2 className="font-heading font-black text-4xl text-white mb-4">
            Ready to Start Your{' '}
            <span className="text-gradient">Coding Journey?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Join thousands of Indian students learning to code for free.
          </p>
          <motion.a
            href="/signup"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-flex items-center gap-2 text-lg px-10 py-4 glow-saffron"
          >
            Start Learning Free — It's 100% Free! 🎉
          </motion.a>
        </motion.div>
      </section>
    </MainLayout>
  )
}