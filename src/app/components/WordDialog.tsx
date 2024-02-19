'use client'
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IWord } from './providers/WordsProvider'
import { createWord, deleteWord } from '../api/word/handlers'


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

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

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

    const handleSave = async () => {
        try {
            await createWord({
                writing: writings,
                reading: readings,
                translation: translations
            })
            onClose()

        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async () => {
        if (!word) return
        try {
            await deleteWord(word.id)
            onClose()

        } catch (error) {
            console.error(error)
        }
    }

    const addWriting = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key !== 'Enter') return
        if (!selectedWriting) return

        setWritings(prev => [...prev, selectedWriting])
        setSelectedWriting('')
    }

    return (
        <Box>
            <Dialog
                open={open}
                onClose={onClose}
            >
                <Dialog
                    open={isDeleteDialogOpen}
                    onClose={() => setIsDeleteDialogOpen(false)}
                >
                    <DialogContent>
                        Are you sure you want to delete selected word?
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant='outlined'
                            onClick={() => setIsDeleteDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant='contained'
                            color='error'
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>

                <Box
                    component="form"
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        value={selectedWriting}
                        onChange={(e) => setSelectedWriting(e.target.value)}
                        onKeyDown={addWriting}
                        margin="normal"
                        fullWidth
                        id="writing"
                        placeholder='Writing'
                        name="writing"
                        autoFocus
                        autoComplete='off'
                    // variant='filled'
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
                    // variant='filled'
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
                    // variant='filled'
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
                                onClick={() => setIsDeleteDialogOpen(true)}
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
                            variant="contained"
                            // disabled={!writings.length}
                            onClick={handleSave}
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