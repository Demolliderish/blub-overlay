import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import Link from "next/link"

export const ErrorCard = () => {
    return (
        <div className="flex justify-center fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <Card>
                <CardHeader>
                    <CardTitle>Login Error</CardTitle>
                    <CardDescription>Something went wrong, please try again</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Link href="/auth/login">
                        <Button variant={"outline"}>Back To Login</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}