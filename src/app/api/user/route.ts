import { NextResponse } from "next/server"
import { db } from "../../lib/db"
import { hash } from 'bcrypt'

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json()

        const existingUser = await db.user.findUnique({
            where: { email: email }
        })

        if (existingUser) {
            return NextResponse.json({
                status: 409,
                error: 'User with this email already exists',
                user: null,
            })
        }

        const hashedPassword = await hash(password, 10)

        const newUser = await db.user.create({
            data: {
                email,
                password: hashedPassword
            }
        })

        const { password: newUserPassword, ...rest } = newUser

        return NextResponse.json({
            status: 201,
            user: rest
        })

    } catch (error) {
        return NextResponse.json({
            status: 500,
            error: error
        })
    }
}

export async function DELETE(req: Request) {
    try {
        const { email } = await req.json()

        const existingUser = await db.user.findUnique({
            where: { email: email }
        })

        if (existingUser) {
            await db.user.delete({
                where: {
                    email: email
                }
            })
        }

        return NextResponse.json({
            status: 201,
        })

    } catch (error) {
        return NextResponse.json({
            status: 500,
            error: error
        })
    }
}