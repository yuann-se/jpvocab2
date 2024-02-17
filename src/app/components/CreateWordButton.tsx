'use client'
import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import WordDialog from './WordDialog'

function CreateWordButton() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <>
            <IconButton
                color='secondary'
                onClick={() => setIsDialogOpen(true)}
            >
                <AddCircleOutlineIcon />
            </IconButton>

            <WordDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                variant='create'
            />
        </>
    )
}

export default CreateWordButton