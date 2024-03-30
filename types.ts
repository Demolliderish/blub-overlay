import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { User } from "@prisma/client";
import { Server as ServerIO } from "socket.io";

export type NextApiResponseServerIO = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: ServerIO;
        }
    }
}

export enum ServerSocketEvents {
    CLIENT_MESSAGE = "overlay_client_message",
    USER_MESSAGE = "user_message",
    JOIN_ROOM = "join_room",
    LEAVE_ROOM = "leave_room",
}

export enum ClientSocketEvents {
    SERVER_MESSAGE = "server_message",

    HAS_JOINED_ROOM = "has_joined_room",
    HAS_LEFT_ROOM = "has_left_room",

    USER_MESSAGE = "user_message",
}

export type OverlayClientInstance = {
    client_id: string
    game: "ROCKETLEAGUE" | "VALORANT" | "DEVELOPMENT"
    room: string
}

export type JoinRoomSocketEventsParams = OverlayClientInstance | {
    user: any
    room: string
}








// TEMPORARY TYPES FOR TESTING PURPOSES

export type TempClientMessage = {
    apiUrl: "/api/socket/eventHandler" | string
    message: string
    user: User
    roomId: string
    event: ServerSocketEvents
}

export type TempMessage = {
    user: User | null,
    type: ClientSocketEvents,
    message: string
}