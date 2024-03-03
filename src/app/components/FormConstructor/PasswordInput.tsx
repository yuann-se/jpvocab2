import React, { useContext } from 'react'
import { FormConstructorContext } from './FormConstructor'
import { IconButton, TextField, TextFieldProps } from '@mui/material'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'


function PasswordInput(textFieldProps: TextFieldProps) {
    const context = useContext(FormConstructorContext)
    if (!context) return null
    const { register, showPassword, setShowPassword, isLoading, errors } = context

    return (
        <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            margin="normal"
            disabled={isLoading}
            error={!!errors.password}
            {...register("password", { required: true })}
            InputProps={{
                endAdornment: (
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(prev => !prev)}
                    >
                        {showPassword ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}
                    </IconButton>
                )
            }}
            {...textFieldProps}
        />
    )
}

export default PasswordInput