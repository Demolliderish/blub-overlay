"use server"

import { LoginSchema } from '@/schemas'
import { z } from 'zod'
import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIR } from '@/routes'
import { AuthError } from 'next-auth'

import { generateVerificationToken } from '@/lib/verification-token'
import { getUserByEmail } from '@/lib/user'

export const login = async (
    values: z.infer<typeof LoginSchema>,
    callbackUrl?: string | null
) => {
    const parsed = LoginSchema.safeParse(values)

    if (!parsed.success) {
        return { error: "Invalid Fields!" }
    }

    const { email, password } = parsed.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exist!" }
    }

    /** Turn on Email Verification **/

    // if (!existingUser.emailVerified) {
    //     const verificationToken = await generateVerificationToken(
    //         existingUser.email
    //     )
    //     return { error: "Please verify your email!" }
    // }


    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIR
        })
    }
    catch (e) {
        if (e instanceof AuthError) {
            switch (e.type) {
                case "CredentialsSignin":
                    return { error: "Invalid Credentials!" };
                default:
                    return { error: "Something went wrong!" };
            }
        }

        throw e;
    }

    return { success: "Logged In!" }
}