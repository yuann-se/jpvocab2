'use client'
import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { IWord, useWordsContext } from './providers/WordsProvider'
import '@/styles/main.scss'
import WordCard from './WordCard'
import WordDialog from './WordDialog/WordDialog'
import CreateWordButton from './CreateWordButton'


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
    const [selectedWord, setSelectedWord] = useState<IWord | null>(null)

    return (
        <Box className={'wordsList'}>
            <WordDialog
                open={!!selectedWord}
                onClose={() => setSelectedWord(null)}
                word={selectedWord || defaultWord}
                variant='edit'
            />

            <Container>
                {!words && <CircularProgress />}

                {words?.map(word => (
                    <WordCard
                        key={word.id}
                        word={word}
                        onClick={() => setSelectedWord(word)}
                    />
                ))}
            </Container>

            <CreateWordButton />
        </Box>
    )
}

export default WordsList