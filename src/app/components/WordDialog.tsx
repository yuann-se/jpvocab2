'use client'
import { Box, Button, Chip, Dialog, DialogActions, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IWord } from './providers/WordsProvider'


interface IProps {
    open: boolean,
    onClose: () => void,
    variant: 'create' | 'edit',
    word?: IWord | null
}

function WordDialog({ open, onClose, variant, word }: IProps) {

    const [writings, setWritings] = useState(word?.writing || [])
    const [selectedWriting, setSelectedWriting] = useState('')
    const [readings, setReadings] = useState(word?.reading || [])
    const [selectedReading, setSelectedReading] = useState('')
    const [translations, setTranslations] = useState(word?.translation || [])
    const [selectedTranslation, setSelectedTranslation] = useState('')

    useEffect(() => {
        if (open && !!word) {
            setWritings(word.writing)
            setReadings(word.reading)
            setTranslations(word.translation)
            setSelectedWriting('')
            setSelectedReading('')
            setSelectedTranslation('')
        }
    }, [open])


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        const response = await fetch('/api/word', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                writing: [formData.get('writing')],
                reading: [formData.get('reading')],
                translation: [formData.get('translation')],
            })
        })

        const data = await response.json()

        console.log(data)
    }


    return (
        <Box>
            <Dialog
                open={open}
                onClose={onClose}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        value={selectedWriting}
                        onChange={(e) => setSelectedWriting(e.target.value)}
                        margin="normal"
                        fullWidth
                        id="writing"
                        placeholder='Writing'
                        name="writing"
                        autoFocus
                        autoComplete='off'
                        variant='filled'
                    />

                    {writings.map(text =>
                        <Chip
                            key={text}
                            onDelete={() => setWritings(prev => prev.filter(item => item !== text))}
                            label={text}
                            variant='outlined'
                            color="primary"
                        // sx={{ backgroundColor: 'secondary.light' }}
                        />
                    )}

                    <TextField
                        value={selectedReading}
                        onChange={(e) => setSelectedReading(e.target.value)}
                        margin="normal"
                        fullWidth
                        id="reading"
                        placeholder="Reading"
                        name="reading"
                        autoFocus
                        autoComplete='off'
                        variant='filled'
                    />

                    {readings.map(text =>
                        <Chip
                            key={text}
                            onDelete={() => setReadings(prev => prev.filter(item => item !== text))}
                            label={text}
                        />
                    )}

                    <TextField
                        value={selectedTranslation}
                        onChange={(e) => setSelectedTranslation(e.target.value)}
                        margin="normal"
                        fullWidth
                        id="translation"
                        placeholder="Translation"
                        name="translation"
                        autoFocus
                        autoComplete='off'
                        variant='filled'
                    />

                    {translations.map(text =>
                        <Chip
                            key={text}
                            onDelete={() => setTranslations(prev => prev.filter(item => item !== text))}
                            label={text}
                        />
                    )}

                    <DialogActions>
                        {variant === 'edit' &&
                            <Button
                                variant="contained"
                                color='error'
                            >
                                Delete
                            </Button>
                        }

                        <Button
                            variant="outlined"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>

                        <Button
                            // type="submit"
                            variant="contained"
                            disabled={!writings.length}
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    )
}

export default WordDialog