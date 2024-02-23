'use client'
import { createTheme, getContrastRatio } from '@mui/material/styles'

const primaryMain = '#664dce'
const primaryDark = '#4f41b7'
const primaryLight = '#f4edff'

const secondaryMain = '#f886ae'
const secondaryDark = '#b28d1c'
const secondaryLight = '#ffedfa'
// const se
const contrastThreshold = 3
export const typographyLight = '#fff'
const typographyDark = '#333333'
const bgLight = '#faf9fc'

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            light: primaryLight,
            main: primaryMain,
            dark: primaryDark,
            // contrastText: getContrastRatio(primaryMain, '#fff') > contrastThreshold
            //     ? typographyLight
            //     : primaryDark,
        },
        secondary: {
            light: secondaryLight,
            main: secondaryMain,
            dark: secondaryDark,
            // contrastText: getContrastRatio(secondaryMain, '#fff') > contrastThreshold
            //     ? typographyLight
            //     : secondaryDark,
        },
        background: {
            default: bgLight
        },
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

        // MuiTextField: {
        //     variants: [
        //         {
        //             props: { variant: 'filled' },
        //             style: {
        //                 backgroundColor: 'white'
        //             }
        //         },
        //         // {
        //         //     props: { variant: 'standard' },
        //         //     style: {
        //         //     }
        //         // }
        //     ],
        // },

        // MuiFilledInput: {
        //     styleOverrides: {
        //         root: {
        //             backgroundColor: primaryLight,
        //             borderRadius: 4,
        //             '&:hover': {
        //                 backgroundColor: primaryLight,
        //             },
        //             '&.Mui-focused': {
        //                 backgroundColor: bgLight,
        //             },
        //             '&::after': {
        //                 borderBottomColor: primaryDark
        //             },

        //             '&::before': {
        //                 opacity: 0
        //             }

        //         },
        //         input: {
        //             padding: '15px 12px',
        //         }
        //     }
        // },

        MuiChip: {
            variants: [
                {
                    props: { variant: 'filled' },
                    style: {
                        backgroundColor: primaryLight,
                        color: typographyDark,
                        '& .MuiChip-deleteIcon': {
                            color: primaryMain,

                            '&:hover, &:active': {
                                color: primaryDark
                            }
                        }
                    },

                }
            ],
            // styleOverrides: {
            //     root: {
            //         color: typographyDark
            //         // backgroundColor: primaryLight
            //     },
            //     // deleteIconMedium: {
            //     //     color: primaryMain
            //     // }
            // }
        }

        // MuiGrid: {
        //     styleOverrides: {
        //         root: {
        //             height: 'fit-content'
        //         }
        //     }
        // }

    },

    typography: {
        fontFamily: '"Noto Sans Variable", "Noto Sans JP Variable", "Arial", sans-serif',
    },
})

export default lightTheme
