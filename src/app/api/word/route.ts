import authOptions from "@/app/lib/authOptions"
import { db } from "@/app/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { writing, reading, translation } = await req.json()

        const session = await getServerSession(authOptions)

        const newWord = await db.word.create({
            data: {
                userId: Number(session?.user.id),
                writing,
                reading,
                translation,
            }
        })

        return NextResponse.json({
            status: 201,
            word: { ...newWord, completePercent: 0 }
        })

    } catch (error) {
        return NextResponse.json({
            status: 500,
            error: error
        })
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        const words = await db.word.findMany({
            where: {
                userId: Number(session?.user.id)
            },
            orderBy: [
                {
                    completePercent: 'asc',
                },
                {
                    id: 'asc'
                }
            ]
        })

        return NextResponse.json({
            status: 201,
            words
        })

    } catch (error) {
        return NextResponse.json({
            status: 500,
            error: error
        })
    }
}