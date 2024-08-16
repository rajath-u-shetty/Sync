import { Button } from '@/components/ui/button'
import { login, signup } from './actions'
import OAuthPage from '@/components/OAuthPage'
export default function LoginPage() {
  return (
    <form className="flex justify-center items-center h-screen border-b">
      <OAuthPage />
    </form>
  )
}
