import { IPreferences } from "@/app/components/providers/PreferencesProvider"
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

        // const buttonPosition = a

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

export async function PUT(req: Request) {
    try {
        const { id, sortField, sortDirection, createButtonPosition }: IPreferences = await req.json()

        const updated = await db.preference.update({
            where: {
                id: id,
            },
            data: {
                sortField,
                sortDirection,
                createButtonPosition: JSON.stringify(createButtonPosition)
            },
        })

        return NextResponse.json({
            status: 201,
            preferences: updated
        })

    } catch (error) {
        return NextResponse.json({
            status: 500,
            error: error
        })
    }
}