import Script from "next/script";
import { Overlay } from "@/components/overlay/overlay";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export default async function OverlayPage({ params }: { params: { room_id: string } }) {
    
    const room = await db.room.findUnique({
        where: { id: params.room_id, },
    })

    if (!room || !params.room_id) {
        console.log('Room does not exist!')
        redirect("/")
    }

    if (process.env.AWS_READY) return (
        <main>
            {/* @ts-ignore */}
            <oc-component href={`http://localhost:3030/oc-testing/1.0.0/?userId=${params.id}`}></oc-component>
            {/* @ignore typescipt errro for oc-component */}

            <Script src="http://localhost:3030/oc-client/client.js" />
        </main>
    )

    return (
       <Overlay roomID={params.room_id} />
    )
}