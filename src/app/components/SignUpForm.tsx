'use client'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { createUser } from '../api/user/handlers'
import { SubmitHandler } from 'react-hook-form'
import EmailInput from './FormConstructor/EmailInput'
import FormConstructor, { Inputs } from './FormConstructor/FormConstructor'
import PasswordInput from './FormConstructor/PasswordInput'
import ConfirmPasswordInput from './FormConstructor/ConfirmPasswordInput'
import { Link } from '@mui/material'


export default function SignUpForm() {
    const router = useRouter()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await createUser({
            email: data.email,
            password: data.password
        })

        router.push('/login')
    }

    return (
        <Box className='authPage'>
            <Avatar sx={{ m: 1 }}>
                <LockOutlinedIcon />
            </Avatar>

            <FormConstructor
                onSubmit={onSubmit}
                title='Sign up'
                LinkComponent={
                    <Link href="/login" variant="body2">
                        Already have an account? Sign in
                    </Link>}
            >
                <EmailInput />
                <PasswordInput />
                <ConfirmPasswordInput />
            </FormConstructor>
        </Box>
    )
}