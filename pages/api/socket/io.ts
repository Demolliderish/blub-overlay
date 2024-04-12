import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { SocketEvents, ServerSocketEventsTypes, NextApiResponseServerIO, ServerSocketMessage, JoinRoomSocketEventsParams } from "@/types";

import { User } from "@prisma/client";
import { Socket } from "socket.io-client";

export const config = {
    api: {
        bodyParser: false
    }
}

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (!res.socket.server.io) {
        const path = "/api/socket/io"
        const httpServer: NetServer = res.socket.server as any;
        const io = new ServerIO(httpServer, {
            path: path,
            addTrailingSlash: false,
            cors: {
                credentials: true,
                origin: "*",
                methods: ["GET", "POST"],
                optionsSuccessStatus: 200
            },
        });

        // Handle Room Joining and Leaving
        io.on("connection", (socket) => {
            console.log("Connected: " + socket.id)

            socket.on(SocketEvents.JOIN_ROOM, ({ user, room }: JoinRoomSocketEventsParams) => {
                if (!user) return
                if (!room) return
                console.log(user)
                if (socket.rooms.has(room)) socket.leave(room);
                socket.join(room);
            })
            
            return null
        })

        res.socket.server.io = io;
    }
    else console.log('Server already running')

    res.end()
}

export default ioHandler