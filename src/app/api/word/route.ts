import { IWord } from "@/app/components/providers/WordsProvider"
import authOptions from "@/app/lib/authOptions"
import { db } from "@/app/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export interface IPostWord {
    writing: IWord['writing'],
    reading: IWord['reading'],
    translation: IWord['translation']
}

export async function POST(req: Request) {
    try {
        const { writing, reading, translation }: IPostWord = await req.json()

        if (!writing.length) {
            return NextResponse.json(
                { error: "Writing is required" },
                { status: 400 }
            )
        }

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
        return NextResponse.json(
            { error: error },
            { status: 500 }
        )
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

export async function DELETE(req: Request) {
    try {
        const id = await req.json()

        const word = await db.word.findUnique({
            where: {
                id: id
            }
        })

        if (!word) {
            return NextResponse.json({
                status: 404,
                error: "Word not found"
            })
        }

        await db.word.delete({
            where: {
                id: id
            },
        })

        return NextResponse.json({
            status: 201,
            id
        })

    } catch (error) {
        return NextResponse.json({
            status: 500,
            error: error
        })
    }
}