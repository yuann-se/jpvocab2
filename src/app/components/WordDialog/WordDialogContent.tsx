import { Box, Button, Chip, Dialog, DialogActions, DialogContent, TextField } from '@mui/material'
import React from 'react'
import { IFieldValues, IWordValues } from './WordDialog'


interface IProps {
    open: boolean,
    onClose: () => void,
    wordValues: IWordValues,
    fieldValues: IFieldValues,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleAdd: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    handleRemove: (e: React.MouseEvent<SVGElement>) => void,
    handleSave: () => Promise<void>
    variant: 'create' | 'edit',
    openDeleteDialog: () => void
}

function WordDialogContent({
    open,
    onClose,
    variant,
    fieldValues,
    wordValues,
    handleChange,
    handleAdd,
    handleRemove,
    handleSave,
    openDeleteDialog,
}: IProps) {
    return (
        <Box>
            <Dialog
                open={open}
                onClose={onClose}
            >
                <Box
                    component="form"
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        value={fieldValues.selectedWriting}
                        onChange={handleChange}
                        onKeyDown={handleAdd}
                        margin="normal"
                        fullWidth
                        id="writing"
                        inputProps={{ 'data-array-name': 'writings' }}
                        placeholder='Writing'
                        name="selectedWriting"
                        autoFocus
                        autoComplete='off'
                    // variant='filled'
                    />

                    {wordValues.writings.map(text =>
                        <Chip
                            key={text}
                            onDelete={handleRemove}
                            label={text}
                            variant='outlined'
                            color="primary"
                            data-array-name='writings'
                        // sx={{ backgroundColor: 'secondary.light' }}
                        />
                    )}

                    <TextField
                        value={fieldValues.selectedReading}
                        onChange={handleChange}
                        onKeyDown={handleAdd}
                        margin="normal"
                        fullWidth
                        id="reading"
                        placeholder="Reading"
                        name="selectedReading"
                        autoFocus
                        autoComplete='off'
                    // variant='filled'
                    />

                    {wordValues.readings.map(text =>
                        <Chip
                            key={text}
                            onDelete={handleRemove}
                            label={text}
                            data-array-name='readings'
                        />
                    )}

                    <TextField
                        value={fieldValues.selectedTranslation}
                        onChange={handleChange}
                        onKeyDown={handleAdd}
                        margin="normal"
                        fullWidth
                        id="translation"
                        placeholder="Translation"
                        name="selectedTranslation"
                        autoFocus
                        autoComplete='off'
                    // variant='filled'
                    />

                    {wordValues.translations.map(text =>
                        <Chip
                            key={text}
                            onDelete={handleRemove}
                            label={text}
                            data-array-name='translations'
                        />
                    )}

                    <DialogActions>
                        {variant === 'edit' &&
                            <Button
                                variant="contained"
                                color='error'
                                onClick={openDeleteDialog}
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

export default WordDialogContent