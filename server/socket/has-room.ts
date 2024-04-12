"use server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

export const hasRoom = async () => {

    const session = await auth()

    if (!session) {
        console.log('no session!')
        return null
    }

    try {
        const user = await db.user.findUnique({
            where: { id: session?.user.id },
            include: { room: true },
        })

        if (!user?.room) {
            return null
        }

        return { room: user.room.roomId } // <--- User in room
    }
    catch (error) {
        console.log(error)
        return null
    }
}