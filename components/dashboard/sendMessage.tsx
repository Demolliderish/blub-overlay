"use client"

import axios from "axios";
import { SocketEvents } from "@/types";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const MessageInput = ({ roomId }: { roomId: string }) => {
    const [message, setMessage] = useState("")

    const session = useSession()
    const user = session.data?.user

    const onSubmit = async () => {
        try {
            const url = "/api/socket/eventHandler";
            const res = await axios.post(url, {
                event: SocketEvents.USER_MESSAGE,
                message: message,
                user: user,
                roomId: roomId,
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Input
                type="text"
                className="w-1/3"
                value={message}
                placeholder="Send a message to the room"
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant={"default"}
                onClick={onSubmit}
            >
                Send Message
            </Button>
        </>
    )
}