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

        const user = await db.user.findUnique({
            where: { id: session?.user.id },
            include: { room: true },
        });

        // Validate if the user is already in the room or not

        if (user?.room) {
            if (user.room?.role === "OWNER") {
                return { error: `You've already created a room! Room ID : ${user.room.userId}` }
            }
            return { error: `You're already in a room!` }
        }


        // Create new room

        const newRoom = await db.room.create({
            data: {
                inviteCode: uuidv4(),
                users: {
                    create: [
                        { userId: session?.user?.id as string, role: "OWNER" }
                    ]
                }
            }
        })
        return { success: newRoom }
    }
    catch (error) {
        return { error: "Failed to create room!" }
    }
}
