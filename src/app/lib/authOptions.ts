import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { db } from "./db"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcrypt"
import { NextAuthOptions } from "next-auth"
// import { Adapter } from "next-auth/adapters"

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,

    session: {
        strategy: "jwt"
    },

    pages: {
        signIn: '/login',
    },

    debug: process.env.VERCEL_ENV === "development",

    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {
                if (!credentials?.password || !credentials?.email) return null

                const existingUser = await db.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!existingUser) {
                    return null
                }

                const isPasswordMatch = await compare(credentials?.password, existingUser.password)

                if (!isPasswordMatch) {
                    return null
                }

                return {
                    id: existingUser.id.toString(),
                    email: existingUser.email
                }
            }
        })
    ],

    callbacks: {
        async session({ session, user, token }) {
            return {
                ...session,
                user: { email: session.user?.email, id: token.sub }
            }
        },

        // async redirect({ url, baseUrl }) {
        //     return url.startsWith(baseUrl)
        //         ? Promise.resolve(url)
        //         : Promise.resolve(baseUrl)
        // }
    }
}

export default authOptions