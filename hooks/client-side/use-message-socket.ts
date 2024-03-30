import { useSocket } from "@/components/providers/socket-provider";
import { ClientSocketEvents, TempMessage } from "@/types";
import { Dispatch, SetStateAction, useEffect } from "react";

export const useMessageSocket = ({ setMessages }: { setMessages: Dispatch<SetStateAction<TempMessage[]>> }) => { // <-- Client socket (NOT SERVER (HOST) SOCKET)
    const { socket } = useSocket()

    const onServerMessage = (data: TempMessage) => {

        console.log(data)

        setMessages(prevMessages => [...prevMessages, {
            user: data.user,
            type: data.type,
            message: data.message,
        }]);
    }

    useEffect(() => {
        if (!socket) return
        socket.on(ClientSocketEvents.SERVER_MESSAGE, onServerMessage)

        return () => {
            socket.off(ClientSocketEvents.SERVER_MESSAGE, onServerMessage);
        }
    }, [socket])
}