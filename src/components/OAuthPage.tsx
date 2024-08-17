'use client'
import { OAuthLogin } from '@/app/(auth)/auth/authActions'
import { Provider } from '@supabase/supabase-js'
import { Button } from './ui/button'

type OAuthProviders = {
  name: Provider,
  title: string,
  icon?: JSX.Element
}



export default function OAuthPage() {

  const OAuthProviders: OAuthProviders[] = [
    {
      name: 'google',
      title: 'Google',
    },
    //{
    //  name: 'github',
    //  title: 'Github',
    //  icon:  <Github />
    //},
  ]

  return (
    <>
      {OAuthProviders.map((provider) => (
        <Button className='flex justify-center items-center gap-2' key={provider.name} 
          onClick={async() => {
            await OAuthLogin(provider.name)
          }}>
          {provider.icon}
          Login with {provider.title}
        </Button>
      )
      )}
    </>
  )
}



