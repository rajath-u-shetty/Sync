'use server'

import prisma from '@/app/utils/db'
import { createClient } from '@/app/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function loginWithEmail(formData: FormData) {
  const supabase = createClient()

  const email = formData.get('email')

  if (typeof email !== 'string') {
    return { error: 'Invalid email or password' }
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function CreateUser() {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()
  const user = data.user

  if (!user) {
    return redirect('/login')
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
      email: user.email,
    },
  })

  if (!dbUser) {
    const newUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: user.user_metadata.full_name,
        image: user.user_metadata.avatar_url,
      },
    })
    return newUser
  }

  return dbUser
}
