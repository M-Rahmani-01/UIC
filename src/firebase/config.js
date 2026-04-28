import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBt419XCN-R8ROZajFMwI0bzO3kbT4ON5o",
  authDomain: "united-indian-coders.firebaseapp.com",
  projectId: "united-indian-coders",
  storageBucket: "united-indian-coders.firebasestorage.app",
  messagingSenderId: "396727030145",
  appId: "1:396727030145:web:d30e58e948bfc73fce5880",
};

const app = initializeApp(firebaseConfig);

// ✅ THESE 3 EXPORTS MUST EXIST
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();