import { useState, useCallback, useRef } from 'react'

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const utteranceRef = useRef(null)

  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return

    // Stop any current speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 1
    utterance.lang = 'en-IN'

    // Try to use an Indian English voice if available
    const voices = window.speechSynthesis.getVoices()
    const indianVoice = voices.find(v => v.lang === 'en-IN') || 
                        voices.find(v => v.lang.startsWith('en')) || 
                        null
    if (indianVoice) utterance.voice = indianVoice

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
    setIsSpeaking(true)
  }, [])

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel()
    setIsSpeaking(false)
  }, [])

  const toggle = useCallback((text) => {
    if (isSpeaking) {
      stop()
    } else {
      speak(text)
    }
  }, [isSpeaking, speak, stop])

  return { speak, stop, toggle, isSpeaking }
}