import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import WordDialog from './WordDialog/WordDialog'
import Draggable from './Draggable'

function CreateWordButton() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <>
            <Draggable>
                <IconButton
                    color='secondary'
                    onClick={() => setIsDialogOpen(true)}
                    onMouseUp={e => e.stopPropagation()}
                // onMouseDown={e => e.stopPropagation()}
                >
                    <AddCircleIcon sx={{ width: '60px', height: '60px' }} />
                </IconButton>
            </Draggable>

            <WordDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                variant='create'
            />
        </>
    )
}

export default CreateWordButton