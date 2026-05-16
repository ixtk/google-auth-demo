import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAvCme6Qc9Jm2AEcD5Zoh6Mles13Ydhrhs",
  authDomain: "login-86ee8.firebaseapp.com",
  projectId: "login-86ee8",
  storageBucket: "login-86ee8.firebasestorage.app",
  messagingSenderId: "805232757074",
  appId: "1:805232757074:web:15fbe1abc0c6452879128b"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
