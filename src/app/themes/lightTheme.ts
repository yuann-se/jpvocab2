'use client'
import { Roboto } from 'next/font/google'
import { createTheme } from '@mui/material/styles'

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            light: ' #df487f',
            main: '#d81b60',
            dark: '#971243',
        },
        secondary: {
            light: '#ffd453',
            main: '#ffca28',
            dark: '#b28d1c',
        },
    },

    typography: {
        fontFamily: roboto.style.fontFamily,
    },
})

export default lightTheme
