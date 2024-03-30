// Top tier middleware for directing users; credits to Antonio

import NextAuth from "next-auth"
import authConfig from "./auth.config"

import {
    DEFAULT_LOGIN_REDIR,
    apiAuthPrefix,
    authRoutes,
    publicRoutes
} from '@/routes'

const { auth } = NextAuth(authConfig)

export default auth((req) => {

    const { nextUrl } = req;
    const isLoggedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute) return // Do nothing if API auth route

    if (isAuthRoute) {
        if(isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIR, nextUrl))
        }
        else {
            return // Do nothing if user is NOT logged in; show page
        }
    }

    if (!isLoggedIn && !isPublicRoutes) {
        // If user is NOT logged in AND is NOT a public route redirect to login page
        return Response.redirect(new URL('/auth/login', nextUrl))
    }

    return // Show page if user is logged in OR is a public route
})
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}