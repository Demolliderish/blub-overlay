"use client"

import { FormSuccess } from "@/components/auth/formSuccess"
import { RoleGate } from "@/components/auth/roleGate"
import { toast } from "sonner"

import {
    Card,
    CardContent,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { isAdmin } from "@/server/admin"

export default function AdminPage() {
    const onServerActionClick = () => {
        isAdmin().then((res) => {
            if (res.success) {
                toast.success(res.success)
            }

            if (res.error) {
                toast.warning(res.error)
            }
        })
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center  ">
            <Card className="py-5">
                <CardContent className="flex flex-col gap-3">
                    <RoleGate allowedRole="ADMIN">
                        <FormSuccess message="You are allowed to see this content!" />
                    </RoleGate>

                    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                        <p className="text-sm font-medium">
                            Admin-only Server Action
                        </p>
                        <Button
                            onClick={onServerActionClick}>
                            Click to test
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

}