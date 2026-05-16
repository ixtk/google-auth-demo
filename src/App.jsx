import './App.css'
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { auth, googleProvider } from './firebase'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

function App() {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [tab, setTab] = useState('login')
  const [loading, setLoading] = useState(false)

  async function handleEmailPasswordRegister() {
    setError('')
    setLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      setEmail('')
      setPassword('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleEmailPasswordLogin() {
    setError('')
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setEmail('')
      setPassword('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleLogin () {
    setError('')
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
          <div className="w-full space-y-4">
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="w-full">
                <TabsTrigger value="login" className="flex-1">Login</TabsTrigger>
                <TabsTrigger value="register" className="flex-1">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-3">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                {error && <p className="text-xs text-destructive">{error}</p>}
                <Button
                  onClick={handleEmailPasswordLogin}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </TabsContent>

              <TabsContent value="register" className="space-y-3">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                {error && <p className="text-xs text-destructive">{error}</p>}
                <Button
                  onClick={handleEmailPasswordRegister}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? 'Registering...' : 'Register'}
                </Button>
              </TabsContent>
            </Tabs>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <Button onClick={handleGoogleLogin} variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
