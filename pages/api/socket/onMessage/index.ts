import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "@/types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIO,
) {
    if (req.method === "POST") {
        console.log(req.body)
        res.status(200)
        res?.socket?.server?.io?.emit("message", req.body)

        res.end()
    }
}   