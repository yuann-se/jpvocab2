'use client'
// import { Noto_Sans, Noto_Sans_JP } from 'next/font/google'
import { createTheme } from '@mui/material/styles'
import NotoSansLightWoff2 from '../../public/fonts/NotoSans-Light.woff2';

// const noto_sans = Noto_Sans({
//     weight: ['300', '400', '500', '700'],
//     subsets: ['latin']
// })

// const noto_sans_jp = Noto_Sans_JP({
//     weight: ['300', '400', '500', '700'],
//     preload: false,
//     // adjustFontFallback: false,
// })

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            light: '#df487f',
            main: '#d81b60',
            dark: '#971243',
        },
        secondary: {
            light: '#ffd453',
            main: '#ffca28',
            dark: '#b28d1c',
        },
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none'
                }
            }
        },

        MuiCssBaseline: {
            styleOverrides: `
            @font-face {
                font-family: 'NotoSans';
                src: local('NotoSans-Light'),
                  url(${NotoSansLightWoff2}) format('woff2'),
                  url('../fonts/NotoSans-Light.woff') format('woff');
                font-weight: 300;
                font-style: normal;
              }
          `
        }
    },

    // typography: {
    //     fontFamily: `${noto_sans.style.fontFamily, noto_sans_jp.style.fontFamily}`,
    // },
})

export default lightTheme
