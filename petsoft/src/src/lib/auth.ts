import NextAuth, { type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { getUserByEmail } from './server-utils'

const config: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        // runs on login
        const { email, password } = credentials

        const user = await getUserByEmail(String(email))

        if (!user) {
          console.log('ERRORRRRR: No user found')
          return null
        }

        const passwordMatch = await bcrypt.compare(
          String(password),
          user.hashedPassword
        )

        if (!passwordMatch) {
          console.log('ERRORRRRR: Password is incorrect')
          return null
        }

        console.log({ user })
        return user
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      // runs on every request

      const goingToAppPart = request.nextUrl.pathname.includes('/app')
      const isLoginRoute = request.nextUrl.pathname === '/login'
      const authorized = Boolean(auth?.user)

      // console.log({request: request.cookies.get('authjs.session-token')?.value})
      // console.log({auth})
      // console.log('url:', request.nextUrl.origin + '/login')
      if (goingToAppPart && !authorized) {
        return false // отправит на /login автоматически
      }

      if (isLoginRoute && authorized) {
        // если пользователь уже залогинен, не пускаем его на /login, редиректим в /app
        return Response.redirect(new URL('/app/dashboard', request.nextUrl))
      }

      return true
    },
    jwt: ({ token, user }) => {
      if (user) {
        // on sign in
        token.userId = user.id
      }

      return token
    },
    session: ({ session, token }) => {
      if (session?.user && token?.userId) {
        // on sign in
        session.user.id = token.userId
      }

      return session
    }
  },
  secret: process.env.AUTH_SECRET,
}

export const { auth, signIn, signOut } = NextAuth(config)
