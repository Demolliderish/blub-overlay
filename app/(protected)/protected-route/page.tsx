import { auth } from "@/auth" // <-- Use for server components

export default async function ProtectedPage() {
    const session = await auth() // <-- Use for server components
    return (
        <div className="w-screen h-screen justify-center items-center flex">
            {JSON.stringify(session)}
        </div>
    )
}