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

// ------------------------- SOCKET EVENTS ----------------------

export enum SocketEvents {
    SERVER_MESSAGE = "server_message", // <--- Socket events being sent from the server to client, overlay, and users (all instances of a socket connection)

    USER_MESSAGE = "user_message",  // <--- Socket events being sent by the user to the server
    CLIENT_MESSAGE = "client_message", // <--- Socket events being sent from the overlay client to the server
    JOIN_ROOM = "join_room",
    LEAVE_ROOM = "leave_room",
}

export enum ServerSocketEventsTypes { // Determine the type of message being sent
    RECEIVED_USER = "recevied_user",
    RECEIVED_CLIENT = "recevied_client"
}

export type ServerSocketMessage = {
    type: ServerSocketEventsTypes
    message: string
    user: User
}


export enum OverlayClientEvents {
    ENTRY = "client:entry",
    EXIT = "client:exit",
    GAMEPREFIX = "game:",
}

export enum RLClientEventTypes {
    GAME_UPDATE = OverlayClientEvents.GAMEPREFIX + "update_state",
}

export type ServerSocketMessageReceivedClient = {
    type: ServerSocketEventsTypes.RECEIVED_CLIENT
    event: string
    message: string
}

// ------------------------- SOCKET INSTANCES ----------------------

export type SocketOverlayClientInstance = {
    user: string
    game: "ROCKETLEAGUE" | "VALORANT" | "DEVELOPMENT"
    room: string
}

export type SocketUserInstance = {
    user: User
    room: string
}

export type JoinRoomSocketEventsParams = SocketOverlayClientInstance | SocketUserInstance


// ------------------------- SOCKET MESSAGE TO SERVER ----------------------
export type ClientSocketMessage = {
    message : string
    event : string
    user : User | "OVERLAY_CLIENT"
    roomId : string
}


// // TEMPORARY TYPES FOR TESTING PURPOSES

// export type TempClientMessage = {
//     apiUrl: "/api/socket/eventHandler" | string
//     message: string
//     user: User | "OVERLAY_CLIENT"
//     roomId: string
//     event: ServerSocketEventsTypes
// }

// export type TempMessage = {
//     user: User | null,
//     type: ClientSocketEvents,
//     message: string
// }