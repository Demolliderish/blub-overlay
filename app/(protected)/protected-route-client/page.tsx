"use client"
import { useSession } from "next-auth/react" // <-- Use for client components

export default function ProtectedPage() {
    const session = useSession() // <-- Use for client components

    return (
        <div className="w-screen h-screen justify-center items-center flex">
            {JSON.stringify(session)}
        </div>
    )
}