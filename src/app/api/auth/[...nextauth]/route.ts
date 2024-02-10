import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "../../../../../prisma/db"
import { compare } from "bcrypt"

const handler = NextAuth({
    adapter: PrismaAdapter(db),

    secret: process.env.NEXTAUTH_SECRET,

    pages: {
        signIn: '/login',
    },

    providers: [
        CredentialsProvider({
            name: 'Credentials',
            type: "credentials",

            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {
                if (!credentials?.password) return null

                const existingUser = await db.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })

                if (!existingUser) return null

                const isPasswordMatch = await compare(credentials?.password, existingUser.password)

                if (!isPasswordMatch) return null

                return {
                    id: existingUser.id.toString(),
                    email: existingUser.email
                }
            }
        })
    ]
})

export { handler as GET, handler as POST }