import { Box, Container } from "@mui/material"
import '@/styles/main.scss'
import WordsList from '@/components/WordsList'
import LogoutButton from "@/app/components/LogoutButton"


export default function Home() {

    return (
        <Box className={'homePage'} id='homePage'>
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
                    <LogoutButton />
                </Container>
            </Box>

            <WordsList />
        </Box>
    )
}
