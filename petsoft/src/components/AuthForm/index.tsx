import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { login, signUp } from '@/serverActions/actions'

export default function AuthForm({ type }: { type: 'login' | 'signup' }) {
  return (
    <form 
      className="mt-5" 
      action={type === 'login' ? login : signUp}
    >
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input name="email" id="email" />
      </div>
      <div className="space-y-1 mt-2">
        <Label htmlFor="password">Password</Label>
        <Input name="password" id="password" type='password' />
      </div>

      <Button className="mt-4">
        {type === 'login' ? 'Log in' : 'Sign Up'}
      </Button>
    </form>
  )
}
