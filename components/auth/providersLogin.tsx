"use client"

import { Button } from "@/components/ui/button"

import { FaTwitch } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

import { signIn } from "next-auth/react" // For client component signin
import { DEFAULT_LOGIN_REDIR } from "@/routes";
import { clientProviders } from "@/auth.config";
import { useSearchParams } from "next/navigation";

export const ProvidersLogin = () => {

    const searchParams = useSearchParams()
    const callbackUrl = searchParams?.get("callbackUrl") || null;

    const onClick = (prodiver: clientProviders) => {
        signIn(prodiver, {
            callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIR,
        })
    }

    return (
        <div className="flex w-full mt-4 gap-2">
            <Button className="w-full" variant={"outline"}
                onClick={() => onClick("twitch")}><FaTwitch className="h-5 w-5" /></Button>
            <Button className="w-full" variant={"outline"}
                onClick={() => onClick("github")}><FaGithub className="h-5 w-5" /></Button>
        </div>
    )
}

