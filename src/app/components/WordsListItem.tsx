import { Grid, Typography } from '@mui/material'
import React from 'react'
import { IWord } from './providers/WordsProvider'
import '@/styles/main.scss'


interface IProps {
    word: IWord,
}

function WordsListItem({ word }: IProps) {
    return (
        <>
            <Grid item xs={10}>
                <Grid container>
                    <Grid item xs={12} sm={4}>
                        <Typography>{word.writing}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={8}>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <Typography>{word.reading}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography>{word.translation}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={2}>
                <Typography>{word.completePercent}%</Typography>
            </Grid>
        </>
    )
}

export default WordsListItem