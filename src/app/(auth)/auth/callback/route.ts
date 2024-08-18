import prisma from '@/app/utils/db';
import { createClient } from '@/app/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Check if the user exists in the Prisma database
        let dbUser = await prisma.user.findUnique({
          where: { id: user.id },
        });

        // If the user doesn't exist, create a new one
        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              id: user.id,
              email: user.email,
              FullName: user.user_metadata.full_name || '',
              image: user.user_metadata.avatar_url || '',
            },
          });
        }

        // Now that the user is ensured in the database, redirect them
        const forwardedHost = request.headers.get('x-forwarded-host'); // original origin before load balancer
        const isLocalEnv = process.env.NODE_ENV === 'development';

        if (isLocalEnv) {
          return NextResponse.redirect(`${origin}${next}`);
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}${next}`);
        } else {
          return NextResponse.redirect(`${origin}${next}`);
        }
      }
    }
  }

  // If the code is not valid or there is an error, redirect to the error page
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}

