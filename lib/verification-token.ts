import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid"

export const getVerificationTokenByToken = async (token: string) => {
    try {
        const verificationToken = await db.verificationToken.findUnique({
            where: { token }
        })
        return verificationToken
    }
    catch (error) {
        return null
    }
}

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verificationToken = await db.verificationToken.findFirst({
            where: { email }
        })
        return verificationToken
    }
    catch (error) {
        return null
    }
}


export const generateVerificationToken = async (email: string) => {
    const token = uuidv4()

    // 10 min expiration time for the token 
    const expires = new Date(new Date().getTime() + 10 * 60 * 1000)

    const existingToken = await getVerificationTokenByEmail(email)

    try {
        if (existingToken) {
            await db.verificationToken.delete({
                where: { id: existingToken.id },
            })
        }

        const verificationToken = await db.verificationToken.create({
            data: {
                email,
                token,
                expires,
            }
        })
        
        return verificationToken
    }
    catch (error) {
        return null
    }
}