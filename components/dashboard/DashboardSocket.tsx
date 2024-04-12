"use client"
import { MessageInput } from "@/components/dashboard/sendMessage"
import { ClientDashboardProps } from "./dashboard"
import { useEffect, useState } from "react"
import { SocketEvents } from "@/types"
import { useSocket } from "@/components/providers/socket-provider"
import { useSession } from "next-auth/react"
import { InviteCodeBtn } from "./InviteCodeBtn"
import { SocketIndicator } from "../indicators/socket-indicator"

export const DashboardWithSocket = ({ params }: ClientDashboardProps) => {


    const session = useSession()
    const user = session.data?.user;
    const { socket } = useSocket()

    useEffect(() => {
        if (!socket) return
        socket.emit(SocketEvents.JOIN_ROOM, {
            user: user,
            room: params.room_id
        })

        socket.on(SocketEvents.SERVER_MESSAGE, (message: string) => {
            console.log(message)
        })
    }, [socket])

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-5">
            <div className="h-1/3 overflow-auto">
                <div className="flex items-center gap-5 ">
                    <h1 className="text-xl font-bold">
                        Room: {params.room_id}
                    </h1>
                    <InviteCodeBtn roomId={params.room_id} />
                </div>
            </div>

            <SocketIndicator />

            <MessageInput roomId={params.room_id} />
        </main>
    )
}