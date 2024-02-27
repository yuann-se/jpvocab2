import { Box, Container } from "@mui/material"
import '@/styles/main.scss'
import WordsList from '@/components/WordsList'
import LogoutButton from "@/app/components/LogoutButton"
import Head from "next/head"


export default function Home() {

    return (
        <Box className={'homePage'} id='homePage'>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
            </Head>
            <Box
                component={'header'}
                className={'header'}
            >
                <Container>
                    <LogoutButton />
                </Container>
            </Box>

            <WordsList />
        </Box>
    )
}
