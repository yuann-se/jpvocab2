'use client'
import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { IWord, useWordsContext } from './providers/WordsProvider'
import '@/styles/main.scss'
import WordsListItem from './WordsListItem'
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

    const hadleDrop = (e: React.DragEvent) => {
        // debugger
        // e.preventDefault()
        // const data = e.dataTransfer.getData('text/plain')
        // const target = e.target as HTMLDivElement
        // const draggableElement = document.getElementById(data)
        // if (!draggableElement) return
        // target.appendChild(draggableElement)
    }

    return (
        <Box className={'wordsList'}
        // onDrop={hadleDrop} onDragOver={e => e.preventDefault()}
        >
            <WordDialog
                open={!!selectedWord}
                onClose={() => setSelectedWord(null)}
                word={selectedWord || defaultWord}
                variant='edit'
            />

            <Container>
                {!words && <CircularProgress />}

                {words?.map(word => (
                    <Grid
                        container
                        key={word.id}
                        className={'wordsListItem'}
                        onClick={() => setSelectedWord(word)}
                    >
                        <WordsListItem word={word} />
                    </Grid>
                ))}

                <CreateWordButton />

            </Container>
        </Box>
    )
}

export default WordsList