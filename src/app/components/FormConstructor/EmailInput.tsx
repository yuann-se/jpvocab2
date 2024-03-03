import { TextField, TextFieldProps } from '@mui/material'
import React, { useContext } from 'react'
import { FormConstructorContext } from './FormConstructor'


function EmailInput({ ...textFieldProps }: TextFieldProps) {
    const context = useContext(FormConstructorContext)
    if (!context) return null
    const { register, isLoading, errors } = context

    return (
        <TextField
            fullWidth
            label="Email"
            autoComplete="email"
            margin="normal"
            disabled={isLoading}
            error={!!errors.email}
            {...register("email", { required: true })}
            {...textFieldProps}
        />
    )
}

export default EmailInput