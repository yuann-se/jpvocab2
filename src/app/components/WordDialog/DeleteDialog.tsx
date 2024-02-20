import { Button, Dialog, DialogActions, DialogContent } from '@mui/material'
import React from 'react'


interface IProps {
    open: boolean,
    onClose: () => void,
    handleDelete: () => Promise<void>
}

function DeleteDialog({ open, onClose, handleDelete }: IProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogContent>
                Are you sure you want to delete selected word?
            </DialogContent>
            <DialogActions>
                <Button
                    variant='outlined'
                    onClick={onClose}
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
    )
}

export default DeleteDialog