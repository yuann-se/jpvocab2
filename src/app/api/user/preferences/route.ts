import authOptions from "@/app/lib/authOptions"
import { db } from "@/app/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        const preferences = await db.preference.findUnique({
            where: {
                userId: Number(session?.user.id)
            },
        })

        return NextResponse.json({
            status: 201,
            preferences
        })

    } catch (error) {
        return NextResponse.json({
            status: 500,
            error: error
        })
    }
}