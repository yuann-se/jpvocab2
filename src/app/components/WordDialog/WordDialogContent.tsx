import { Backdrop, Box, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, Grid, TextField } from '@mui/material'
import React from 'react'
import { EArrayNames, IFieldValues, IWordValues } from './WordDialog'


interface IProps {
    open: boolean,
    onClose: () => void,
    isLoading: boolean,
    wordValues: IWordValues,
    fieldValues: IFieldValues,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleAdd: (name: EArrayNames) => (e: React.KeyboardEvent<HTMLInputElement>) => void,
    handleRemove: (name: EArrayNames, value: string) => (e: React.MouseEvent<SVGElement>) => void,
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
            <Box
                component="form"
                noValidate
                sx={{ mt: 1, minWidth: '100%' }}
            >
                <TextField
                    value={fieldValues.selectedWriting}
                    onChange={handleChange}
                    onKeyDown={handleAdd(EArrayNames.writings)}
                    margin="normal"
                    fullWidth
                    id="writing"
                    placeholder='Writing'
                    name="selectedWriting"
                    autoFocus
                    autoComplete='off'
                    disabled={isLoading}
                />

                <Grid container spacing={1}>
                    {wordValues.writings.map(text =>
                        <Grid key={text} item>
                            <Chip
                                onDelete={handleRemove(EArrayNames.writings, text)}
                                label={text}
                                variant='outlined'
                                color="primary"
                                data-array-name='writings'
                                disabled={isLoading}
                            />
                        </Grid>
                    )}
                </Grid>

                <TextField
                    value={fieldValues.selectedReading}
                    onChange={handleChange}
                    onKeyDown={handleAdd(EArrayNames.readings)}
                    margin="normal"
                    fullWidth
                    id="reading"
                    placeholder="Reading"
                    name="selectedReading"
                    autoFocus
                    autoComplete='off'
                    disabled={isLoading}

                />

                <Grid container spacing={1}>
                    {wordValues.readings.map(text =>
                        <Grid item key={text}>
                            <Chip
                                onDelete={handleRemove(EArrayNames.readings, text)}
                                label={text}
                                variant='outlined'
                                color="primary"
                                disabled={isLoading}
                            />
                        </Grid>
                    )}
                </Grid>

                <TextField
                    value={fieldValues.selectedTranslation}
                    onChange={handleChange}
                    onKeyDown={handleAdd(EArrayNames.translations)}
                    margin="normal"
                    fullWidth
                    id="translation"
                    placeholder="Translation"
                    name="selectedTranslation"
                    autoFocus
                    autoComplete='off'
                    disabled={isLoading}

                />

                <Grid container spacing={1}>
                    {wordValues.translations.map(text =>
                        <Grid item key={text}>
                            <Chip
                                onDelete={handleRemove(EArrayNames.translations, text)}
                                label={text}
                                variant='outlined'
                                color="primary"
                                disabled={isLoading}
                            />
                        </Grid>
                    )}
                </Grid>

                <DialogActions>
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

                    <Button
                        variant="outlined"
                        onClick={onClose}
                        disabled={isLoading}
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


                </DialogActions>

                <Backdrop open={isLoading} sx={{ position: 'absolute' }}>
                    <CircularProgress />
                </Backdrop>
            </Box>
        </Dialog>
    )
}

export default WordDialogContent