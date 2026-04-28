import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'
import useAuthStore from "../store/useAuthStore";
import { saveUserProfile } from '../firebase/helpers'

export function useAuth() {
  const { setUser, clearUser, setLoading } = useAuthStore()

  useEffect(() => {
    setLoading(true)

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name:
              firebaseUser.displayName ||
              firebaseUser.email?.split('@')[0] ||
              'Coder',
            avatar: firebaseUser.photoURL || null,
          }

          // 🔥 Wrap in try-catch safe block
          try {
            await saveUserProfile(firebaseUser.uid, {
              name: userData.name,
              email: userData.email,
              avatar: userData.avatar,
            })
          } catch (err) {
            console.error("Firestore error:", err)
          }

          setUser(userData)
        } else {
          clearUser()
        }
      } catch (err) {
        console.error("Auth error:", err)
        clearUser()
      } finally {
        setLoading(false) // ✅ VERY IMPORTANT
      }
    })

    return () => unsubscribe()
  }, [setUser, clearUser, setLoading])
}