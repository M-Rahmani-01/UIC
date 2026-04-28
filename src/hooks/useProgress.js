import { useEffect, useCallback } from 'react'
import { getProgress, getCertificates } from '../firebase/helpers'
import useAuthStore from '../store/useAuthStore'
import useProgressStore from '../store/useProgressStore'

export function useProgress(langId = null) {
  const { user } = useAuthStore()
  const { updateProgress, setCertificates, loadProgress } = useProgressStore()

  const fetchProgress = useCallback(async () => {
    if (!user) return
    if (langId) {
      const data = await getProgress(user.uid, langId)
      if (data) updateProgress(langId, data)
    }
  }, [user, langId, updateProgress])

  const fetchCertificates = useCallback(async () => {
    if (!user) return
    const certs = await getCertificates(user.uid)
    setCertificates(certs)
  }, [user, setCertificates])

  useEffect(() => {
    fetchProgress()
  }, [fetchProgress])

  return { fetchProgress, fetchCertificates }
}