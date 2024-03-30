"use client"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { useSession } from "next-auth/react"

import Link from "next/link"

import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { signOut } from "next-auth/react"
import { UserButton } from "../auth/userButton"
import { FaSignOutAlt } from "react-icons/fa";

export const NavbarSession = () => {

    const session = useSession()

    return (
        <div className="w-screen flex justify-center overflow-hidden fixed top-0 left-0 py-2">
            <div className="w-2/3 flex justify-center relative p-3 bg-slate-300 rounded-lg">
                <NavigationMenu>
                    <NavigationMenuList className="flex gap-2">
                        <NavbarItem href="/">
                            <h1>Home</h1>
                        </NavbarItem>
                        <NavbarItem href="/protected-route">
                            <h1>Protected route server</h1>
                        </NavbarItem>
                        <NavbarItem href="/protected-route-client">
                            <h1>Protected route client</h1>
                        </NavbarItem>
                        <NavbarItem href="/socketio">
                            <h1>SocketIO Test</h1>
                        </NavbarItem>
                        <NavbarItem href="/admin-route">
                            <h1>Admin route</h1>
                        </NavbarItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {session.status === "authenticated" ?
                    <>
                        <UserButton />

                        <form onSubmit={() => signOut({ callbackUrl: "/" })}>
                            <Button className="rounded-lg m-2 cursor-pointer" variant={"destructive"}>
                                <FaSignOutAlt className="w-4 h-4 mr-2" />
                                <h1 className="font-bold">Sign Out</h1>
                            </Button>
                        </form>
                    </> :
                    <>
                        <Link href={"/auth/login"} className="ml-auto m-2">
                            <Button>
                                Login
                            </Button>
                        </Link>
                    </>

                }
            </div>
        </div>
    )
}

const NavbarItem = ({ href, children }: { href: string, children: React.ReactNode }) => {
    return (
        <NavigationMenuItem>
            <Link href={href} legacyBehavior passHref>
                <NavigationMenuLink className={cn("", navigationMenuTriggerStyle())}>
                    {children}
                </NavigationMenuLink>
            </Link>
        </NavigationMenuItem>
    )
}