'use client'
import { Box, Button, Dialog, DialogActions, TextField } from '@mui/material'
import React from 'react'
import { IWord } from './providers/WordsProvider'


interface IProps {
    open: boolean,
    onClose: () => void,
    variant: 'create' | 'edit',
    word?: IWord | null
}

function WordDialog({ open, onClose, variant }: IProps) {

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
                        margin="normal"
                        required
                        fullWidth
                        id="writing"
                        label="Word"
                        name="writing"
                        autoFocus
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        id="reading"
                        label="Reading"
                        name="reading"
                        autoFocus
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        id="translation"
                        label="Translation"
                        name="translation"
                        autoFocus
                    />

                    <DialogActions>
                        <Button
                            variant="contained"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
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