import bcrypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

import GitHub from "@auth/core/providers/github"
import Google from "@auth/core/providers/google"
import Twitch from "@auth/core/providers/twitch"


import { LoginSchema } from "./schemas"
import { getUserByEmail } from "./lib/user"

export type clientProviders = "google" | "github" | "twitch"

export default {
  providers: [
    // Google and Github Auth Providers
    // Google,
    Twitch({
      clientId: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    // Credentials Providers
    // Login schema check, then get user by email
    Credentials({
      async authorize(credentials) {
        const parsed = LoginSchema.safeParse(credentials)
        if (parsed.success) {
          const { email, password } = parsed.data
          const user = await getUserByEmail(email)

          // Check if user exists & if user is using credentials login
          // If not using credentials login...
          if (!user || !user.password) return null

          const passwordsMatch = await bcrypt.compare(password, user.password)

          // Login successful!
          if (passwordsMatch) return user

        }
        return null
      },
    })
  ],
} satisfies NextAuthConfig