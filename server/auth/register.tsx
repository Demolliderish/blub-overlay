"use server"

import { RegisterSchema } from '@/schemas'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/lib/user'

import { generateVerificationToken } from '@/lib/verification-token'

export const register = async (
    values: z.infer<typeof RegisterSchema>,
    redirectTo?: string | undefined | null
) => {
    const parsed = RegisterSchema.safeParse(values)

    if (!parsed.success) {
        return { error: "Invalid Fields!" }
    }

    const { name, email, password, confirmPassword } = parsed.data

    if (password !== confirmPassword) {
        return { error: "Passwords do not match!" }
    }

    const hashedP = await bcrypt.hash(password, 10)
    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return { error: "Email is already in use!" }
    }

    // Create db instance
    await db.user.create({
        data: {
            name,
            email,
            password: hashedP
        }
    })

    /** Turn on email verficiation **/

    // const verificationToken = await generateVerificationToken(email)
    // return {success: "Confirmation email sent!"}

    return { success: "User created!" }
}