'use client'
import { createTheme, getContrastRatio } from '@mui/material/styles'

const primaryMain = '#d81b60'
const primaryDark = '#971243'
const contrastThreshold = 4.5
export const typographyLight = 'whitesmoke'
const typographyDark = '#333333'

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            light: '#df487f',
            main: primaryMain,
            dark: primaryDark,
            contrastText: getContrastRatio(primaryMain, '#fff') > contrastThreshold
                ? typographyLight
                : primaryDark,
        },
        secondary: {
            light: '#ffd453',
            main: '#ffca28',
            dark: '#b28d1c',
        },
        // background: {
        //     default: 'whitesmoke'
        // },
        text: {
        },
        contrastThreshold: contrastThreshold,
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none'
                }
            },

            variants: [
                // {
                //     props: { variant: 'text' },
                //     style: {
                //         color: 'whitesmoke'
                //     }
                // },
                {
                    props: { variant: 'contained' },
                    style: {
                        boxShadow: 'none',
                        color: typographyLight
                    }
                }
            ]
        },

        MuiContainer: {
            styleOverrides: {
                root: {
                    height: '100%'
                }
            }
        },

        // MuiGrid: {
        //     styleOverrides: {
        //         root: {
        //             height: 'fit-content'
        //         }
        //     }
        // }

    },

    typography: {
        fontFamily: '"NotoSans"," NotoSansJP", "Arial", sans-serif'
    },
})

export default lightTheme
