'use client'
import { Backdrop, Box, CircularProgress, Container, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { IWord, useWordsContext } from './providers/WordsProvider'
import '@/styles/main.scss'
import WordCard from './WordCard'
import WordDialog from './WordDialog/WordDialog'
import CreateWordButton from './CreateWordButton'
import { usePreferencesContext } from './providers/PreferencesProvider'


const defaultWord: IWord = {
    id: 0,
    writing: [],
    reading: [],
    translation: [],
    completePercent: 0,
    isLearned: false,
    userId: 0
}

function WordsList() {
    const { words } = useWordsContext()
    const { preferences } = usePreferencesContext()
    const [selectedWord, setSelectedWord] = useState<IWord | null>(null)

    // console.log(preferences)

    return (
        <Box className={'wordsList'}>
            <WordDialog
                open={!!selectedWord}
                onClose={() => setSelectedWord(null)}
                word={selectedWord || defaultWord}
                variant='edit'
            />

            <Container>
                <Backdrop open={!words} sx={{ backgroundColor: 'transparent' }}>
                    <CircularProgress />
                </Backdrop>

                {words?.map(word => (
                    <WordCard
                        key={word.id}
                        word={word}
                        onClick={() => setSelectedWord(word)}
                    />
                ))}
            </Container>

        </Box>
    )
}

export default WordsList