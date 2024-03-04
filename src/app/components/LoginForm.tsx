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
import { useRouter } from 'next/navigation'


type Inputs = {
    email: string
    password: string
}

export default function LoginForm() {
    const router = useRouter()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const res = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        })

        if (!res) return

        if (res.ok) {
            router.push("/")
        } else {
            throw 'Authorization error'
        }
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