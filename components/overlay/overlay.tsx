"use client"

import { SocketProvider } from "../providers/socket-provider"
import { Ov_MessageHandler } from "./Ov_MessageHandler"
import { OverlayProvider } from "./overlay-provider"


export const Overlay = ({ roomID }: { roomID: string }) => {
    return (
        <SocketProvider>
            <OverlayProvider roomID={roomID}>
                <Ov_MessageHandler />
            </OverlayProvider>
        </SocketProvider>
    )
}