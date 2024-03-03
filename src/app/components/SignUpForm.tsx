'use client'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { Alert, CircularProgress, Divider, IconButton, Slide, SlideProps, Snackbar } from '@mui/material'
import { useRouter } from 'next/navigation'
import { createUser } from '../api/user/handlers'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'
import GoogleIcon from '@mui/icons-material/Google'
import GoogleLogo from '@/public/Google_logo_24.svg'
import Image from 'next/image'


type Inputs = {
    email: string
    password: string
    confirm: string
}

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction='left' />
}

export default function SignUpForm() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [apiError, setApiError] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true)
        try {
            await createUser({
                email: data.email,
                password: data.password
            })

            router.push('/login')
        } catch (error) {
            setApiError(JSON.stringify(error))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Box className='authPage'>
            <Avatar sx={{ m: 1 }}>
                <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
                Sign up
            </Typography>

            <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 1 }}
            >
                <TextField
                    fullWidth
                    label="Email"
                    autoComplete="email"
                    margin="normal"
                    {...register("email", { required: true })}
                    error={!!errors.email}
                    disabled={isLoading}
                />

                <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    margin="normal"
                    {...register("password", { required: true })}
                    error={!!errors.password}
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
                />

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
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                    disabled={isLoading}
                >
                    {isLoading && <CircularProgress />}
                    Sign Up
                </Button>

                <Divider>or</Divider>

                <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 2, mb: 2 }}
                    disabled={isLoading}
                >
                    <Image src={GoogleLogo} alt='Google logo' className='googleLogo' />
                    Sign up with Google
                </Button>

                <Grid container justifyContent="flex-end">
                    <Grid item xs>
                        <Link href="/login" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>

            <Snackbar
                open={!!apiError}
                // onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                TransitionComponent={SlideTransition}
            >
                <Alert
                    // onClose={handleClose}
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    {apiError}
                </Alert>
            </Snackbar>
        </Box>
    )
}