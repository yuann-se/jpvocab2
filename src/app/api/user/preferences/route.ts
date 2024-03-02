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

// export async function PUT(req: Request) {
//     try {
//         const { id, writing, reading, translation }: IPutWord = await req.json()

//         const word = await db.word.findUnique({
//             where: {
//                 id: id
//             }
//         })

//         if (!word) {
//             return NextResponse.json({
//                 status: 404,
//                 error: "Word not found"
//             })
//         }

//         const updatedWord = await db.word.update({
//             where: {
//                 id: id,
//             },
//             data: {
//                 writing, reading, translation
//             },
//         })

//         return NextResponse.json({
//             status: 201,
//             word: updatedWord
//         })

//     } catch (error) {
//         return NextResponse.json({
//             status: 500,
//             error: error
//         })
//     }
// }