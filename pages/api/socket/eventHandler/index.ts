import { NextApiRequest } from "next";
import { NextApiResponseServerIO, TempMessage } from "@/types";
import { ServerSocketEvents, ClientSocketEvents } from "@/types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIO,
) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { message, event, user, roomId } = req.body

        if (!roomId) {
            return res.status(400).json({ error: "Room ID not found" })
        }

        if (!message) {
            return res.status(400).json({ error: "Message missing" })
        }

        if (event === ServerSocketEvents.USER_MESSAGE) {
            res?.socket?.server?.io?.to(roomId).emit(ClientSocketEvents.SERVER_MESSAGE, {
                user: user,
                type: ClientSocketEvents.USER_MESSAGE,
                message: message
            } as TempMessage)
        }

        return res.status(200).json({ message: "Success" });

    } catch (e) {
        console.log("[MESSAGES_POST]", e);
        return res.status(500).json({ message: "Internal Error" });
    }
}   