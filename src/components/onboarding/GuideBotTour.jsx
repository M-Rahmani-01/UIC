import { useState, useEffect } from 'react'
import Joyride, { STATUS } from 'react-joyride'
import useAuthStore from '../../store/useAuthStore'

const TOUR_STEPS = [
  {
    target: '.navbar-logo',
    content: (
      <div className="text-center">
        <div className="text-3xl mb-2">👋</div>
        <p className="font-bold text-white mb-1">Welcome to United Indian Coders!</p>
        <p className="text-gray-300 text-sm">I'm UIC Bot 🤖. Let me show you around!</p>
      </div>
    ),
    disableBeacon: true,
  },
  {
    target: '.language-grid',
    content: (
      <div>
        <div className="text-2xl mb-2">🌐</div>
        <p className="font-bold text-white mb-1">Pick Your Language</p>
        <p className="text-gray-300 text-sm">Each language card opens a complete learning path — from beginner to pro!</p>
      </div>
    ),
  },
  {
    target: '.language-card-python',
    content: (
      <div>
        <div className="text-2xl mb-2">🔓</div>
        <p className="font-bold text-white mb-1">Click to Enter!</p>
        <p className="text-gray-300 text-sm">Click any language card to start your journey. Python is great for beginners!</p>
      </div>
    ),
    disableBeacon: true,
  },
  {
    target: '.chatbot-button',
    content: (
      <div>
        <div className="text-2xl mb-2">🤖</div>
        <p className="font-bold text-white mb-1">Your AI Tutor</p>
        <p className="text-gray-300 text-sm">Stuck on a problem? I'm always here! Click anytime for instant coding help in Hindi or English.</p>
      </div>
    ),
  },
  {
    target: 'body',
    placement: 'center',
    content: (
      <div className="text-center">
        <div className="text-4xl mb-3">🚀</div>
        <p className="font-black text-white text-xl mb-2">You're All Set!</p>
        <p className="text-gray-300 text-sm mb-3">Start with any language below. Remember:</p>
        <p className="text-saffron-400 font-bold">Every expert was once a beginner.</p>
        <p className="text-white font-black text-lg mt-1">YOU CAN DO IT! 💪</p>
      </div>
    ),
    disableBeacon: true,
  },
]

export default function GuideBotTour() {
  const [run, setRun] = useState(false)
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated && !localStorage.getItem('uic_tour_done')) {
      const timer = setTimeout(() => setRun(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [isAuthenticated])

  const handleCallback = (data) => {
    const { status } = data
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      localStorage.setItem('uic_tour_done', 'true')
      setRun(false)
    }
  }

  return (
    <Joyride
      steps={TOUR_STEPS}
      run={run}
      continuous
      showSkipButton
      showProgress
      callback={handleCallback}
      styles={{
        options: {
          primaryColor: '#FF6B00',
          backgroundColor: '#1a1a2e',
          textColor: '#ffffff',
          arrowColor: '#1a1a2e',
          overlayColor: 'rgba(0,0,0,0.7)',
          zIndex: 1000,
        },
        tooltip: {
          borderRadius: '16px',
          border: '1px solid rgba(255,107,0,0.3)',
          fontFamily: "'Nunito', sans-serif",
          padding: '20px',
        },
        tooltipTitle: {
          color: '#FF6B00',
        },
        buttonNext: {
          backgroundColor: '#FF6B00',
          borderRadius: '10px',
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 700,
        },
        buttonBack: {
          color: '#94a3b8',
          fontFamily: "'Nunito', sans-serif",
        },
        buttonSkip: {
          color: '#94a3b8',
          fontFamily: "'Nunito', sans-serif",
        },
      }}
    />
  )
}