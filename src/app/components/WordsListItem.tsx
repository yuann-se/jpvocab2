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
                        <Typography className='writing'>
                            {word.writing.join(', ')}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={8}>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <Typography>
                                    {word.reading.join(', ')}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={6}
                                flexDirection={'column'}
                                mt={'5px'}
                            >
                                {word.translation.map((item, ind) =>
                                    <Typography key={ind}>&bull; {item}</Typography>
                                )}
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