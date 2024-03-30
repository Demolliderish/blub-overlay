import middleware from "./middleware"

/** Routes not mentioned here will be SECURED, only when authenticated can user visit them 
 * >> {@link middleware}
**/

export const publicRoutes = [
    "/",
]

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
]

export const apiAuthPrefix = "/api/auth"
export const DEFAULT_LOGIN_REDIR = "/protected-route"