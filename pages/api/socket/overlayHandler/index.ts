import { NextApiRequest } from "next";
import { ClientSocketMessage, NextApiResponseServerIO, OverlayClientEvents, ServerSocketEventsTypes, ServerSocketMessageReceivedClient, SocketEvents } from "@/types";
import { db } from "@/lib/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIO,
) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { message, event, user, roomId } = req.body as ClientSocketMessage

        if (!roomId) {
            console.log("room id not found")
            return res.json({ error: "Room ID not found", status: 400 })
        }

        if (!user || user != "OVERLAY_CLIENT") {
            console.log("user not found")
            return res.json({ error: "User not found", status: 400 })
        }

        if (!message || !event) {
            console.log("body missing")
            return res.json({ error: "Body missing", status: 400 })
        }

        const validate_id = await db.room.findUnique({
            where: { id: roomId }
        })

        if (!validate_id) {
            return res.json({ error: "Invalid Room ID", status: 400 })
        }


        switch (event) {
            case OverlayClientEvents.ENTRY:
                console.log('entry')
                res?.socket?.server?.io?.to(roomId).emit(SocketEvents.SERVER_MESSAGE, {
                    type: ServerSocketEventsTypes.RECEIVED_CLIENT,
                    event: event,
                    message: message
                } as ServerSocketMessageReceivedClient)
                break
            default:
                event.includes(OverlayClientEvents.GAMEPREFIX) && res?.socket?.server?.io?.to(roomId).emit(SocketEvents.SERVER_MESSAGE, {
                    type: ServerSocketEventsTypes.RECEIVED_CLIENT,
                    event: event,
                    message: message
                } as ServerSocketMessageReceivedClient)
                break
        }

        return res.json({ message: "Success" });

    } catch (e) {
        console.log("[MESSAGES_POST]", e);
        return res.status(500).json({ error: "Internal Error" });
    }
}   