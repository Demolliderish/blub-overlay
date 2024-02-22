"use client"

import { useSocket } from "../providers/socket-provider"

export const SocketIndicator = () => {
    const { isConnected } = useSocket()
    return (
        <>
            {isConnected ? 
                (<div className="bg-green-500 p-5 rounded-lg">
                    <h1>Connected</h1>
                </div>) :
                (<div className="bg-red-500 p-5 rounded-lg">
                    <h1>Disconnected</h1>
                </div>)
            }
        </>
    )
}