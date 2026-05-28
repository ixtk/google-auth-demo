import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from '../firebase'

function ForgotPassword({ email, setEmail, onBack }) {

  function resetPassword() {
    sendPasswordResetEmail(auth, email)
  } 

  return (
    <div className="w-full space-y-4 rounded-lg border border-border/60 bg-background/80 p-6 text-left shadow-sm">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Account help
        </p>
        <h2 className="text-2xl font-medium text-foreground">
          Forgot your password?
        </h2>
        <p className="text-sm text-muted-foreground">
          Enter the email address tied to your account. This screen is UI only,
          so it does not send a reset email yet.
        </p>
      </div>

      <div className="space-y-3">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button className="w-full" onClick={resetPassword} type="button">
          Send reset link
        </Button>
        <Button
          variant="ghost"
          type="button"
          onClick={onBack}
          className="w-full text-muted-foreground hover:text-foreground"
        >
          Back to login
        </Button>
      </div>
    </div>
  )
}

export { ForgotPassword }
