import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { ClientSocketEvents, NextApiResponseServerIO, ServerSocketEvents, JoinRoomSocketEventsParams, TempMessage } from "@/types";
export const config = {
    api: {
        bodyParser: false
    }
}

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (!res.socket.server.io) {
        console.log('Init socket server')
        const path = "/api/socket/io"
        const httpServer: NetServer = res.socket.server as any;
        const io = new ServerIO(httpServer, {
            path: path,
            addTrailingSlash: false,
            cors: {
                origin: "*",
            },
        });

        // Handle Room Joining and Leaving

        io.on("connection", (socket) => {
            socket.on(ServerSocketEvents.JOIN_ROOM, ({ user, room }) => {
                if (!room) return
                if (socket.rooms.has(room)) socket.leave(room);
                socket.join(room);

                io.to(room).emit(
                    ClientSocketEvents.SERVER_MESSAGE,
                    {
                        user: "DEV",
                        type: ClientSocketEvents.HAS_JOINED_ROOM,
                        message: `${user.name} has joined the room`
                    } as TempMessage
                );
            });
        })

        res.socket.server.io = io;
    }
    else console.log('Server already running')

    res.end()
}

export default ioHandler