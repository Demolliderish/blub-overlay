"use server"

import { db } from "@/lib/db"

export const getInviteCode = async ({ room_id }: { room_id: string }) => {
    try {
        const room = await db.room.findUnique({
            where: {
                id: room_id
            },
        })
        return room?.inviteCode
    }
    catch (error) {
        return null
    }
}