import { createClient } from '@/app/utils/supabase/client';
import { Provider } from '@supabase/supabase-js'
import { redirect } from "next/navigation";

export async function OAuthLogin(provider: Provider) {

  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: 'http://localhost:3000/auth/callback',
    }
  })

  if (error) {
    redirect('/error')
  }

  return redirect(data.url)
}
