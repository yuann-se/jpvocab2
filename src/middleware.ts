export { default } from "next-auth/middleware"

export const config = {
    matcher: ["/"],
    secret: process.env.NEXTAUTH_SECRET
}