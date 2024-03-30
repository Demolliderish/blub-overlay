"use server"

import { currentRole } from "@/hooks/server-side/use-current-role"
import { UserRole } from "@prisma/client"

export const isAdmin = async () => {
    const role = await currentRole()

    if (role !== UserRole.ADMIN) return { error: "Forbidden" }

    return { success: "Allowed!" }
}