"use server"

import { v4 as uuidv4 } from 'uuid'
import { db } from "@/lib/db"
import { auth } from "@/auth"

export const createRoom = async () => {

    const session = await auth()
    if (!session) {
        return { error: "Unauthorized" }
    }
    
    try {

        const userInRoom = await db.user.findUnique({
            where: { id: session?.user?.id },
            include: { room: true },
        });

        if (userInRoom?.room) {
            return { error: "Already in room!" }
        }

        const room = await db.room.create({
            data: {
                inviteCode: uuidv4(),
                users: {
                    connect: {
                        id: session?.user?.id
                    }
                },
            }
        })
        return { success: room }
    }
    catch (error) {
        return { error: "Failed to create room!" }
    }
}
