import { db } from "@/app/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { userId, writing, transcription, translation } = await req.json()

        const newWord = await db.word.create({
            data: {
                userId,
                writing,
                transcription,
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