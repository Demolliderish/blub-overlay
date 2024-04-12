import { NextApiRequest } from "next";
import { ClientSocketMessage, NextApiResponseServerIO, ServerSocketEventsTypes, SocketEvents } from "@/types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIO,
) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { message, event, user, roomId } = req.body as ClientSocketMessage

        console.log(user)

        if (!roomId) {
            return res.status(400).json({ error: "Room ID not found" })
        }

        if (!user) {
            return res.status(400).json({ error: "User not found" })
        }

        if (!message || !event) {
            return res.status(400).json({ error: "Body missing" })
        }


        switch (event) {
            case SocketEvents.USER_MESSAGE:
                console.log("[SERVER_MESSAGE]")
                res?.socket?.server?.io?.to(roomId).emit(SocketEvents.SERVER_MESSAGE, {
                    user: user,
                    type: ServerSocketEventsTypes.RECEIVED_USER,
                    message: message
                })
                break
            default:
                break
        }

        return res.status(200).json({ message: "Success" });

    } catch (e) {
        console.log("[MESSAGES_POST]", e);
        return res.status(500).json({ error: "Internal Error" });
    }
}   