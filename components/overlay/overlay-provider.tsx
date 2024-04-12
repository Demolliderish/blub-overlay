"use client"

import {
    useContext,
    createContext,
    useEffect,
    useState
} from "react"

import { useSocket, SocketProviderWrapper } from "@/components/providers/socket-provider"

import { SocketEvents, ServerSocketEventsTypes, ServerSocketMessageReceivedClient, RLClientEventTypes } from "@/types"

type OverlayContextType = {
    roomID: string | null,
    gameData: any | null,
    dashboardData: any | null
}

const OverlayContext = createContext<OverlayContextType>({
    roomID: null,
    gameData: {},
    dashboardData: {}
})

export const useOverlay = () => {
    return useContext(OverlayContext)
}

export const OverlayProvider = ({ children, roomID }: { children: React.ReactNode, roomID: string }) => {

    const [gameData, setGameData] = useState({})
    const [dashboardData, setDashboardData] = useState({})
    const { socket } = useSocket()


    useEffect(() => {
        if (!socket) return
        socket.emit(SocketEvents.JOIN_ROOM, {
            user: "OVERLAY_PROVIDER",
            room: roomID
        })

        socket.on(SocketEvents.SERVER_MESSAGE, (data: ServerSocketMessageReceivedClient) => {
            if (data.event == RLClientEventTypes.GAME_UPDATE) {
                setGameData(data.message)
            }
        })
    }, [socket])

    return (
        <OverlayContext.Provider value={{ roomID, gameData, dashboardData }}>
            {children}
        </OverlayContext.Provider>
    )
}