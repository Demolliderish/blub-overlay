"use client"

import { SocketProvider } from "@/components/providers/socket-provider"
import { DashboardWithSocket } from "./DashboardSocket";

export type ClientDashboardProps = {
    params: { room_id: string }
}

export const ClientDashboard = ({ params }: ClientDashboardProps) => {
    return (
        <SocketProvider>
            <DashboardWithSocket params={params} />
        </SocketProvider>
    )
}