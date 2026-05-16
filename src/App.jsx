import './App.css'
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from 'firebase/auth'
import { auth, googleProvider } from './firebase'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

function App() {
  const [user, setUser] = useState(null)

  async function handleGoogleLogin () {
    const result = await signInWithPopup(auth, googleProvider)
    console.log(result)
  }

  async function handleGoogleLogut () {
    await signOut(auth)
  }

  useEffect(function() {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser)
      setUser(currentUser)
    })
    return unsubscribe
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="flex w-full max-w-[320px] flex-col items-center gap-6 rounded-lg border p-8 shadow-sm">
        {/* user !== null */}
        {user && (
          <div className="space-y-1 text-center">
            <h1>{user.displayName}</h1>
            <img src={user.photoURL} alt="" />
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        )}
        
        {user ? (
          <Button onClick={handleGoogleLogut} variant="secondary">
            Logout
          </Button>
        ) : (
          <Button className="w-full" onClick={handleGoogleLogin}>
            Login with Google
          </Button>
        )}
      </div>
    </div>
  )
}

export default App
