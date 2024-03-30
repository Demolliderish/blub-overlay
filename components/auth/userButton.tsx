"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession } from "next-auth/react"

import Link from "next/link"
import { CiUser } from "react-icons/ci";
import { LuCreditCard } from "react-icons/lu";

export const UserButton = () => {

    const session = useSession()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="rounded-lg m-2 cursor-pointer ml-auto" >
                    <h1 className="font-bold">{session.data?.user?.name}</h1>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <CiUser className="w-4 h-4 mr-2" />
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <LuCreditCard className="w-4 h-4 mr-2" />
                        <span>Billing</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}