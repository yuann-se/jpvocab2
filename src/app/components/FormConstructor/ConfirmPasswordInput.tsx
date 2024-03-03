import { IconButton, TextField, TextFieldProps } from '@mui/material'
import React, { useContext } from 'react'
import { FormConstructorContext } from './FormConstructor'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'


function ConfirmPasswordInput(textFieldProps: TextFieldProps) {
    const context = useContext(FormConstructorContext)
    if (!context) return null
    const { register, watch, showPassword, setShowPassword, isLoading, errors } = context

    return (
        <TextField
            fullWidth
            label="Password again"
            type={showPassword ? "text" : "password"}
            margin="normal"
            {...register("confirm", {
                required: true,
                validate: (val: string) => {
                    if (watch('password') !== val) {
                        return false
                    }
                }
            })}
            error={!!errors.confirm}
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
            disabled={isLoading}
            {...textFieldProps}
        />
    )
}

export default ConfirmPasswordInput