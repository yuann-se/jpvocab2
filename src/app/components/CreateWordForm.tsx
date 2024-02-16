'use client'
import { Box, Button, Dialog, DialogActions, IconButton, TextField } from '@mui/material'
import React, { useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function CreateWordForm() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        // await signIn('credentials', {
        //     email: data.get('email'),
        //     password: data.get('password'),
        //     callbackUrl: `${window.location.origin}/`,
        //     // redirect: false
        // })
    }

    return (
        <Box>
            <IconButton
                onClick={() => setIsDialogOpen(true)}
            >
                <AddCircleOutlineIcon />
            </IconButton>

            <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
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
                </Box>

                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => setIsDialogOpen(false)}
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
            </Dialog>
        </Box>
    )
}

export default CreateWordForm