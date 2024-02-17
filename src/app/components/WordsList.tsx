'use client'
import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { IWord, useWordsContext } from './providers/WordsProvider'
import styles from '@/styles/main.module.scss'
import WordsListItem from './WordsListItem'
import WordDialog from './WordDialog'


function WordsList() {
    const { words } = useWordsContext()
    const [selectedWord, setSelectedWord] = useState<IWord | null>(null)

    return (
        <Box className={styles.wordsList}>
            <WordDialog
                open={!!selectedWord}
                onClose={() => setSelectedWord(null)}
                word={selectedWord}
                variant='edit'
            />

            <Container>
                {!words && <CircularProgress />}

                {words?.map(word => (
                    <Grid
                        container
                        key={word.id}
                        className={styles.wordsListItem}
                        onClick={() => setSelectedWord(word)}
                    >
                        <WordsListItem word={word} />
                    </Grid>
                ))}
            </Container>
        </Box>
    )
}

export default WordsList