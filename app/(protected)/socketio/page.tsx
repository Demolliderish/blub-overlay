// import { SocketProvider } from "@/components/providers/socket-provider"
// import { SocketIndicator } from "@/components/indicators/socket-indicator"
// import { MessageInput } from "@/components/sendMessage"

"use client"

import { Button } from "@/components/ui/button"
import { useOrigin } from "@/hooks/use-origin"
import { createRoom } from "@/server/socket/create-room"
import { toast } from "sonner"
import { navigate } from "@/server/navigate/navigate"
import { useEffect } from "react"
import { hasRoom } from "@/server/socket/has-room"

export default function SocketPage() {

    const origin = useOrigin()

    useEffect(() => {
        if (!origin) return
        hasRoom().then((res) => {
            if (res?.room) navigate(`${origin}/socketio/${res.room}`)
        })
    }, [origin])

    const create = () => {
        createRoom().then((res) => {
            if (res.error) {
                toast.warning(res.error)
            }

            if (res.success) {
                const room = res.success
                navigate(`${origin}/socketio/${room.id}`)
            }
        })
    }

    return (
        <div className="w-screen h-screen overflow-hidden bg-slate-200 flex items-center justify-center">
            <Button className="font-bold text-2xl p-7 shadow-2xl" variant={"default"}
                onClick={create}>Create new socket room</Button>
        </div>
    )
}