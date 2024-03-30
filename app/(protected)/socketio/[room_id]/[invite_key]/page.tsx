import { db } from "@/lib/db"
import { navigate } from "@/server/navigate/navigate"
import { auth } from "@/auth"

export default async function InvitePage({ params }: { params: { room_id: string, invite_key: string } }) {

    const session = await auth()
    if (!session || !params.room_id || !params.invite_key) {
        return navigate("/")
    }

    const room = db.room.findUnique({
        where: {
            id: params.room_id,
            inviteCode: params.invite_key
        },
    })

    if (!room) return navigate("/")

    else {

        const userInRoom = await db.user.findUnique({
            where: { id: session?.user?.id },
            include: { room: true },
        });

        if (userInRoom?.room) {
            return navigate(`/socketio/${params.room_id}`)
        }

        await db.room.update({
            where: {
                id: params.room_id
            },
            data: {
                users: {
                    connect: {
                        id: session?.user?.id
                    }
                }
            }
        })
        return navigate(`/socketio/${params.room_id}`)
    }
}