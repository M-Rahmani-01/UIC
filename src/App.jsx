import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'
import { useAuth } from './hooks/useAuth'
import ProtectedRoute from './routes/ProtectedRoute'
import LoadingScreen from './components/ui/LoadingScreen'
import ChatbotButton from './components/chatbot/ChatbotButton'
import ChatWindow from './components/chatbot/ChatWindow'
import BackToTop from './components/ui/BackToTop'
import GuideBotTour from './components/onboarding/GuideBotTour'

const Home = lazy(() => import('./pages/Home'))
const LanguageHome = lazy(() => import('./pages/LanguageHome'))
const TopicPage = lazy(() => import('./pages/TopicPage'))
const ProblemPage = lazy(() => import('./pages/ProblemPage'))
const Profile = lazy(() => import('./pages/Profile'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const NotFound = lazy(() => import('./pages/NotFound'))

function AppContent() {
  useAuth()

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a2e',
            color: '#fff',
            border: '1px solid rgba(255,107,0,0.3)',
            borderRadius: '12px',
            fontFamily: 'Nunito, sans-serif',
          },
          success: {
            iconTheme: { primary: '#FF6B00', secondary: '#fff' },
          },
        }}
      />
      <GuideBotTour />
      <AnimatePresence mode="wait">
        <Suspense fallback={<h1 style={{color:"white"}}>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn/:lang" element={<LanguageHome />} />
            <Route
              path="/learn/:lang/:topic"
              element={
                <ProtectedRoute>
                  <TopicPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/learn/:lang/:topic/:prob"
              element={
                <ProtectedRoute>
                  <ProblemPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <ChatbotButton />
      <ChatWindow />
      <BackToTop />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}