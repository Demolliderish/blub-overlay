"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"

export const removeRoom = async () => {
    const session = await auth()

    if (!session) {
        return { error: "Unauthorized" }
    }

    try {
        const user = await db.user.findUnique({
            where: { id: session?.user.id },
            include: { room: true },
        });

        if (user) {
            if (user.room?.role === "OWNER") {
                const room = await db.room.delete({
                    where: {
                        id: user.room.userId
                    }
                })
                return { success: `Room "${room.id}" has been removed!` }
            }
        }
        
        return {}
    }
    catch (error) {
        return { error: "Failed to create room!" }
    }
}