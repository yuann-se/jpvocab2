import { Grid, Typography } from '@mui/material'
import React from 'react'
import { IWord } from './providers/WordsProvider'
import '@/styles/main.scss'
import CircularProgressWithLabel from './CircularProgressWithLabel'


interface IProps {
    word: IWord,
    onClick: () => void,
}

function WordCard({ word, onClick }: IProps) {
    return (
        <Grid
            container
            className={'wordsListItem'}
            onClick={onClick}
        >
            <Grid item xs={10}>
                <Grid container>
                    <Grid item xs={12} sm={4}>
                        <Typography fontWeight={500} className='writing'>
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
                            >
                                <Typography>{word.translation.join(', ')}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={2}>
                <CircularProgressWithLabel value={word.completePercent} />
            </Grid>
        </Grid>
    )
}

export default WordCard