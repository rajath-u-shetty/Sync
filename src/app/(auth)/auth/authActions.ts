import { getURL } from '@/app/utils/helpers';
import { createClient } from '@/app/utils/supabase/client';
import { Provider } from '@supabase/supabase-js'
import { redirect } from "next/navigation";

export async function OAuthLogin(provider: Provider) {

  if (!provider) {
    return redirect('/login')
  }

  const supabase = createClient()

  const redirectUrl = getURL('/auth/callback')

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
    }
  })

  if (error) {
    redirect('/error')
  }

  return redirect(data.url)
}
