import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'

// ✅ FIX: make sure correct import
import { db } from './config'

// Save progress for a user/language/topic
export async function saveProgress(uid, langId, topicId, stepCompleted) {
  try {
    if (!uid) return false // ✅ safety

    const progressRef = doc(db, 'progress', uid, 'languages', langId)
    const existing = await getDoc(progressRef)
    
    if (existing.exists()) {
      const data = existing.data()
      const completedTopics = data.completedTopics || []
      const completedProblems = data.completedProblems || []
      
      if (stepCompleted === 'topic' && !completedTopics.includes(topicId)) {
        completedTopics.push(topicId)
      }
      
      await updateDoc(progressRef, {
        completedTopics,
        completedProblems,
        currentStep: stepCompleted,
        lastActivity: serverTimestamp(),
        percentComplete: Math.min(100, Math.round((completedTopics.length / 10) * 100)),
      })
    } else {
      await setDoc(progressRef, {
        completedTopics: stepCompleted === 'topic' ? [topicId] : [],
        completedProblems: [],
        currentStep: stepCompleted,
        lastActivity: serverTimestamp(),
        percentComplete: 10,
      })
    }
    return true
  } catch (error) {
    console.error('Error saving progress:', error)
    return false
  }
}

// Get progress for a user/language
export async function getProgress(uid, langId) {
  try {
    if (!uid) return null // ✅ safety

    const progressRef = doc(db, 'progress', uid, 'languages', langId)
    const snap = await getDoc(progressRef)
    return snap.exists() ? snap.data() : null
  } catch (error) {
    console.error('Error getting progress:', error)
    return null
  }
}

// Save a certificate
export async function saveCertificate(uid, certData) {
  try {
    if (!uid) return false // ✅ safety

    const certRef = collection(db, 'certificates', uid, 'earned')
    await addDoc(certRef, {
      ...certData,
      earnedAt: serverTimestamp(),
    })
    
    // Update user total certificates count
    const userRef = doc(db, 'users', uid)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      await updateDoc(userRef, {
        totalCertificates: (userSnap.data().totalCertificates || 0) + 1,
      })
    }

    return true
  } catch (error) {
    console.error('Error saving certificate:', error)
    return false
  }
}

// Get all certificates for a user
export async function getCertificates(uid) {
  try {
    if (!uid) return [] // ✅ safety

    const certRef = collection(db, 'certificates', uid, 'earned')
    const q = query(certRef, orderBy('earnedAt', 'desc'))
    const snap = await getDocs(q)

    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
  } catch (error) {
    console.error('Error getting certificates:', error)
    return []
  }
}

// Save feedback
export async function saveFeedback(feedbackData) {
  try {
    await addDoc(collection(db, 'feedback'), {
      ...feedbackData,
      createdAt: serverTimestamp(),
    })
    return true
  } catch (error) {
    console.error('Error saving feedback:', error)
    return false
  }
}

// Create or update user profile
export async function saveUserProfile(uid, userData) {
  try {
    if (!uid) return false // ✅ safety

    const userRef = doc(db, 'users', uid)
    const snap = await getDoc(userRef)

    if (!snap.exists()) {
      await setDoc(userRef, {
        ...userData,
        createdAt: serverTimestamp(),
        totalCertificates: 0,
        streak: 0,
      })
    } else {
      await updateDoc(userRef, { ...userData })
    }

    return true
  } catch (error) {
    console.error('Error saving user profile:', error)
    return false
  }
}

// Get user profile
export async function getUserProfile(uid) {
  try {
    if (!uid) return null // ✅ safety

    const userRef = doc(db, 'users', uid)
    const snap = await getDoc(userRef)

    return snap.exists() ? { id: snap.id, ...snap.data() } : null
  } catch (error) {
    console.error('Error getting user profile:', error)
    return null
  }
}