'use client'
import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { signIn } from 'next-auth/react'
import { SubmitHandler } from 'react-hook-form'
import FormConstructor from './FormConstructor/FormConstructor'
import EmailInput from './FormConstructor/EmailInput'
import PasswordInput from './FormConstructor/PasswordInput'


type Inputs = {
    email: string
    password: string
}

export default function LoginForm() {
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await signIn('credentials', {
            email: data.email,
            password: data.password,
            callbackUrl: `${window.location.origin}/`,
            // redirect: false
        })
    }

    return (
        <Box className='authPage'>
            <Avatar sx={{ m: 1 }}>
                <LockOutlinedIcon />
            </Avatar>

            <FormConstructor
                title='Login'
                onSubmit={onSubmit}
                LinkComponent={
                    <Link href='/sign-up' variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>}
            >
                <EmailInput />
                <PasswordInput />
            </FormConstructor>
        </Box>
    )
}