import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import LearningLayout from '../layouts/LearningLayout'
import ArticleReader from '../components/learning/ArticleReader'
import VideoSection from '../components/learning/VideoSection'
import ProblemsGrid from '../components/learning/ProblemsGrid'
import { getLanguage } from '../data/languages'
import useAuthStore from '../store/useAuthStore'
import useProgressStore from '../store/useProgressStore'
import { saveProgress } from '../firebase/helpers'
import toast from 'react-hot-toast'

// Lazy import topic data
const topicDataMap = {
  python: () => import('../data/topics/python').then(m => m.default || m.pythonTopics),
  c: () => import('../data/topics/c').then(m => m.default || m.cTopics),
  javascript: () => import('../data/topics/javascript').then(m => m.default || m.javascriptTopics),
  java: () => import('../data/topics/java').then(m => m.default || m.javaTopics),
  cpp: () => import('../data/topics/cpp').then(m => m.default || m.cppTopics),
  html: () => import('../data/topics/html').then(m => m.default || m.htmlTopics),
  sql: () => import('../data/topics/sql').then(m => m.default || m.sqlTopics),
  dsa: () => import('../data/topics/dsa').then(m => m.default || m.dsaTopics),
}

export default function TopicPage() {
  const { lang, topic } = useParams()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [topicData, setTopicData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuthStore()
  const { getLanguageProgress, updateProgress } = useProgressStore()

  const langConfig = getLanguage(lang)
  const progress = getLanguageProgress(lang)
  const completedProblems = progress.completedProblems || []

  useEffect(() => {
    const loader = topicDataMap[lang]
    if (!loader) {
      setLoading(false)
      return
    }
    loader().then(data => {
      setTopicData(data?.[topic] || null)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [lang, topic])

  const handleMarkRead = async () => {
    setCurrentStep(2)
    if (user) {
      await saveProgress(user.uid, lang, topic, 'read')
      toast.success('Article completed! 📖 Step 2 unlocked!')
    } else {
      toast.success('Progress saved locally!')
    }
  }

  const handleMarkWatched = async () => {
    setCurrentStep(3)
    if (user) {
      await saveProgress(user.uid, lang, topic, 'watched')
      toast.success('Video step done! 🎬 Problems unlocked!')
    } else {
      toast.success('Step 3 unlocked!')
    }
  }

  if (loading) {
    return (
      <LearningLayout currentStep={1} langId={lang} topicId={topic}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton h-16 rounded-xl mb-4" />
          ))}
        </div>
      </LearningLayout>
    )
  }

  if (!topicData) {
    return (
      <LearningLayout currentStep={1} langId={lang} topicId={topic}>
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🚧</div>
          <h2 className="text-2xl font-bold text-white mb-2">Topic Coming Soon!</h2>
          <p className="text-gray-400 mb-6">We're working hard on this topic. Check back soon!</p>
          <button onClick={() => navigate(`/learn/${lang}`)} className="btn-primary">
            ← Back to {langConfig?.name}
          </button>
        </div>
      </LearningLayout>
    )
  }

  const unlockedProblemIndex = completedProblems.length > 0
    ? Math.min(completedProblems.length, (topicData.problems?.length || 1) - 1)
    : 0

  return (
    <LearningLayout currentStep={currentStep} langId={lang} topicId={topic}>
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <ArticleReader
              title={topicData.title}
              article={topicData.article}
              onMarkRead={handleMarkRead}
              isRead={currentStep > 1}
            />
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <VideoSection
              title={topicData.title}
              youtubeLinks={topicData.youtubeLinks || []}
              onMarkWatched={handleMarkWatched}
              isWatched={currentStep > 2}
            />
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <ProblemsGrid
              problems={topicData.problems || []}
              completedProblems={completedProblems}
              unlockedIndex={unlockedProblemIndex}
              langId={lang}
              topicId={topic}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </LearningLayout>
  )
}