import { Backdrop, Box, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, Grid, TextField } from '@mui/material'
import React from 'react'
import { EArrayNames, IFieldValues, IWordValues } from './WordDialog'
import InputWithChips from '../InputWithChips'

interface IProps {
    open: boolean,
    onClose: () => void,
    isLoading: boolean,
    wordValues: IWordValues,
    fieldValues: IFieldValues,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleAdd: (name: EArrayNames) => (e: React.KeyboardEvent<HTMLInputElement>) => void,
    handleRemove: (name: EArrayNames, value: string) => void,
    handleCreate: () => Promise<void>,
    handleSave: () => Promise<void>,
    variant: 'create' | 'edit',
    openDeleteDialog: () => void
}

function WordDialogContent({
    open,
    onClose,
    isLoading,
    variant,
    fieldValues,
    wordValues,
    handleChange,
    handleAdd,
    handleRemove,
    handleCreate,
    handleSave,
    openDeleteDialog,
}: IProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
        >
            <Box className='wordDialog'>
                <InputWithChips
                    value={fieldValues.selectedWriting}
                    onChange={handleChange}
                    onKeyDown={handleAdd(EArrayNames.writings)}
                    label='Writing'
                    name="selectedWriting"
                    disabled={isLoading}
                    chipValues={wordValues.writings}
                    onDelete={(text) => handleRemove(EArrayNames.writings, text)}
                />

                <InputWithChips
                    value={fieldValues.selectedReading}
                    onChange={handleChange}
                    onKeyDown={handleAdd(EArrayNames.readings)}
                    label='Reading'
                    name="selectedReading"
                    disabled={isLoading}
                    chipValues={wordValues.readings}
                    onDelete={(text) => handleRemove(EArrayNames.readings, text)}
                />

                <InputWithChips
                    value={fieldValues.selectedTranslation}
                    onChange={handleChange}
                    onKeyDown={handleAdd(EArrayNames.translations)}
                    label='Translation'
                    name="selectedTranslation"
                    disabled={isLoading}
                    chipValues={wordValues.translations}
                    onDelete={(text) => handleRemove(EArrayNames.translations, text)}
                />

                <DialogActions sx={{
                    mt: 2,
                    pl: 0,
                    pr: 0,
                    justifyContent: variant === 'create' ? '' : 'space-between'
                }}>
                    {variant === 'edit' &&
                        <Button
                            variant="contained"
                            color='error'
                            onClick={openDeleteDialog}
                            disabled={isLoading}
                        >
                            Delete
                        </Button>
                    }

                    <Box>
                        <Button
                            variant="outlined"
                            onClick={onClose}
                            disabled={isLoading}
                            sx={{ mr: 1 }}
                        >
                            Cancel
                        </Button>

                        {variant === 'edit' &&
                            <Button
                                variant="contained"
                                onClick={handleSave}
                                disabled={isLoading}
                            >
                                Save
                            </Button>
                        }

                        {variant === 'create' &&
                            <Button
                                variant="contained"
                                onClick={handleCreate}
                                disabled={isLoading}
                            >
                                Create
                            </Button>
                        }
                    </Box>
                </DialogActions>

                <Backdrop open={isLoading} sx={{ position: 'absolute' }}>
                    <CircularProgress />
                </Backdrop>
            </Box>
        </Dialog>
    )
}

export default WordDialogContent