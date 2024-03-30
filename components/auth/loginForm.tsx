"use client"

import { z } from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/schemas';
import { useState, useTransition } from 'react';
import { ProvidersLogin } from './providersLogin';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/auth/formError';
import { FormSuccess } from './formSuccess'

import { useSearchParams } from 'next/navigation';

// Server Actions RSC
import { login } from '@/server/auth/login';
import Link from 'next/link';

export const LoginForm = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams?.get("callbackUrl") || null;
    const urlError = searchParams?.get("error") === "OAuthAccountNotLinked" ? "Email already use with another account!" : "";

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values, callbackUrl).then((data) => {
                setError(data.error)
                setSuccess(data.success)
            })
        })
    };

    return (
        <div className='w-screen h-screen justify-center items-center flex bg-slate-800'>
            <div className='bg-white p-5 rounded-lg w-1/5 min-w-[200px]'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="blubby.fisher@example.com"
                                            type='email' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="ilovefishes123"
                                            type='password' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormError message={error || urlError} />
                        <FormSuccess message={success} />

                        <Button type="submit" className='w-full'>Log In</Button>
                    </form>
                </Form>

                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>

                <ProvidersLogin />

                <Link href="/auth/register" className='text-sm text-center hover:underline mx-auto relative block mt-5'>{`Don't have an account?`}</Link>
            </div>
        </div>
    )
}
