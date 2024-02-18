import { Box, Container } from "@mui/material"
import '@/styles/main.scss'
import WordsList from '@/components/WordsList'
import LogoutButton from "@/app/components/LogoutButton"
import CreateWordButton from "./components/CreateWordButton"


export default function Home() {

    return (
        <Box className={'homePage'}>
            <Box
                sx={{
                    backgroundColor: 'primary.main',
                    height: '4em'
                }}
                component={'header'}
            // className = {styles.header}
            >
                <Container
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <CreateWordButton />
                    <LogoutButton />
                </Container>
            </Box>

            <WordsList />
        </Box>
    )
}
