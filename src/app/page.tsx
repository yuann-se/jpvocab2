import { Box, Typography } from "@mui/material"
import { getServerSession } from "next-auth"
import authOptions from "./lib/authOptions"
import SignOutButton from "./components/SignOutButton"
import { db } from "./lib/db"
import styles from '@/styles/main.module.scss'

// interface Props {
//     words: {
//         id: Number,
//         word: String[],
//         transcription: String[],
//         translation: String[],
//         completePercent: Number,
//         userId: Number,
//         // user            User     @relation(fields: [userId], references: [id])
//     }
// }

const getWords = async () => {
    const session = await getServerSession(authOptions)

    const words = await db.word.findMany({
        where: {
            userId: Number(session?.user.id)
        },
        orderBy: {
            completePercent: 'asc',
        },
    })

    return words
}

export default async function Home() {

    const words = await getWords()

    return (
        <Box className={styles.homePage}>
            <Box className={styles.header}>

            </Box>
            <Typography>Home</Typography>
            <SignOutButton />
            {JSON.stringify(words)}
        </Box>
    )
}
