import './App.css'
import {
  signInWithPopup,
  signInWithRedirect,
  onAuthStateChanged
} from "firebase/auth"
import { auth, googleProvider } from "./firebase"
import { useEffect, useState } from 'react'

function App() {
  const [user, setUser] = useState(null)

  async function handleGoogleLogin () {
    const result = await signInWithPopup(auth, googleProvider)

    console.log(result)
  }

  useEffect(function() {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return unsubscribe
  })

  return (
    <>
      <div>
        {user !== null && user.email}
        
        <button onClick={handleGoogleLogin}>Login with Google</button>
      </div>
    </>
  )
}

export default App
