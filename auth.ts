// Auth adapter

import NextAuth, { type DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { getUserById } from "./lib/user"

import { db } from "./lib/db"
import { UserRole } from "@prisma/client"
import authConfig from "@/auth.config"

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn, // For server component OR server action signin
  signOut,
} = NextAuth({
  trustHost: true,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id
        },
        data: {
          emailVerified: new Date()
        }
      })
    }
  },
  callbacks: {

    /** TODO Check if user is EMAIL VERFIFIED **/

    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true

      const existingUser = await getUserById(user.id as string);
      if (!existingUser
        // || !existingUser.emailVerified
      ) return false

      return true
    },
    async session({ token, session }) {
      // Define user ID
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      // Get user's role 
      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      return session
    },

    async jwt({ token }) {
      if (!token.sub) return token // If user is not logged in return token

      const existingUser = await getUserById(token.sub!) // Get existing user by their ID

      if (!existingUser) return token // If existing user is not found, return token

      token.role = existingUser.role // Define the user's role on their token

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig
})