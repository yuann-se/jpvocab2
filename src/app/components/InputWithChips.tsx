import { Chip, Grid, TextField } from '@mui/material'
import React, { KeyboardEventHandler } from 'react'
import { EArrayNames } from './WordDialog/WordDialog'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'


interface IProps {
    value: string,
    name: string,
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onKeyDown: KeyboardEventHandler<HTMLDivElement>,
    disabled: boolean,
    chipValues: string[],
    onDelete: (event: any) => void,
}

function InputWithChips({
    value,
    name,
    placeholder,
    onChange,
    onKeyDown,
    disabled,
    chipValues,
    onDelete,
}: IProps) {
    return (
        <>
            <TextField
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                margin="normal"
                fullWidth
                placeholder={placeholder}
                name={name}
                autoFocus
                autoComplete='off'
                disabled={disabled}
            />

            <Grid container spacing={1}>
                {chipValues.map(text =>
                    <Grid key={text} item>
                        <Chip
                            onDelete={() => onDelete(text)}
                            label={text}
                            // variant='outlined'
                            color="primary"
                            disabled={disabled}
                            deleteIcon={<HighlightOffOutlinedIcon sx={{ stroke: 'primary.light', strokeWidth: 1 }} />}
                        />
                    </Grid>
                )}
            </Grid></>
    )
}

export default InputWithChips