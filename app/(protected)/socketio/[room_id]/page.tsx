import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { ClientDashboard } from "@/components/dashboard/dashboard"

export default async function Page({ params }: { params: { room_id: string } }) {

    // Handle Auth 
    const session = await auth()
    const user = session?.user

    if (!user) { // If user does not exist redirect back to homepage
        redirect("/")
    }

    const room = await db.room.findUnique({
        where: {
            id: params.room_id,
            users: {
                some: {
                    id: user.id,
                }
            }
        },
    })

    if (!room) { // If room does not exist OR user is NOT in room, redirect back to homepage
        console.log('Room does not exist or user is not in room')
        redirect("/")
    }

    return (
        <>
            {/* Connect to socket.io room */}
            <ClientDashboard params={params} />
        </>
    )
}

