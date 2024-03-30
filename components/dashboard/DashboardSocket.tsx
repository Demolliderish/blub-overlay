"use client"

import { SocketIndicator } from "@/components/indicators/socket-indicator"
import { MessageInput } from "@/components/sendMessage"
import { ClientDashboardProps } from "./dashboard"
import { useMessageSocket } from "@/hooks/client-side/use-message-socket"
import { useEffect, useState } from "react"
import { ClientSocketEvents, ServerSocketEvents, TempMessage } from "@/types"
import { useSocket } from "@/components/providers/socket-provider"
import { useSession } from "next-auth/react"
import { Button } from "../ui/button"
import { InviteCodeBtn } from "./InviteCodeBtn"

export const DashboardWithSocket = ({ params }: ClientDashboardProps) => {


    const session = useSession()
    const user = session.data?.user;
    const [messages, setMessages] = useState<TempMessage[]>([])
    const { socket } = useSocket()

    useMessageSocket({ setMessages })

    useEffect(() => {
        if (!socket) return
        console.log("Connecting to Room: " + params.room_id)

        socket.emit(ServerSocketEvents.JOIN_ROOM, {
            user: user,
            room: params.room_id
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
                {
                    messages.map((message, index) => {

                        if (message.type === ClientSocketEvents.HAS_JOINED_ROOM) {
                            return (
                                <div key={index}>
                                    {message.message}
                                </div>
                            )
                        }

                        return (
                            <div key={index}>
                                {message.user?.name} : {message.message}
                            </div>
                        )
                    }

                    )
                }
            </div>
            {/* <SocketIndicator /> */}
            <MessageInput roomId={params.room_id} />
        </main>
    )
}