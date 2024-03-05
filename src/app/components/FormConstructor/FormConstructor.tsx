'use client'
import { Alert, Box, Button, CircularProgress, Divider, Link, Slide, SlideProps, Snackbar, TextFieldProps, Typography } from '@mui/material'
import Image from 'next/image'
import React, { createContext, useState } from 'react'
import { FieldErrors, SubmitHandler, UseFormRegister, UseFormWatch, useForm } from 'react-hook-form'
import GoogleLogo from '@/public/Google_logo_24.svg'


function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction='left' />
}

export type Inputs = {
    email: string
    password: string
    confirm: string
}

interface IFormConstructorContext {
    register: UseFormRegister<Inputs>
    watch: UseFormWatch<Inputs>
    errors: FieldErrors<Inputs>
    isLoading: boolean
    showPassword: boolean,
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
}

interface IFormConstructorProps {
    children: React.ReactNode
    title: string,
    onSubmit: SubmitHandler<Inputs>
    LinkComponent?: React.ReactNode
}

export const FormConstructorContext = createContext<IFormConstructorContext | null>(null)

function FormConstructor({ children, title, onSubmit, LinkComponent }: IFormConstructorProps) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [apiError, setApiError] = useState({ show: false, message: '' })

    const onSubmitProcessed: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true)
        try {
            await onSubmit(data)
        } catch (error) {
            console.log(error)
            setApiError({ show: true, message: JSON.stringify(error) })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Box
            component="form"
            className='authForm'
            onSubmit={handleSubmit(onSubmitProcessed)}
            sx={{ mt: 1 }}
        >
            <Typography component="h1" variant="h5" textAlign={'center'}>
                {title}
            </Typography>

            <FormConstructorContext.Provider
                value={{
                    register,
                    watch,
                    errors,
                    isLoading,
                    showPassword,
                    setShowPassword,
                }}
            >
                {children}
            </FormConstructorContext.Provider>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
                disabled={isLoading}
            >
                {isLoading && <CircularProgress size={20} sx={{ mr: '10px' }} />}
                {title}
            </Button>

            <Divider>or</Divider>

            <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 2, mb: 2 }}
                disabled={isLoading}
            >
                <Image
                    src={GoogleLogo}
                    alt='Google logo'
                    className='googleLogo'
                    style={{ opacity: isLoading ? .5 : 1 }}
                />
                {`${title} with Google`}
            </Button>

            {LinkComponent}

            <Snackbar
                open={apiError.show}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                TransitionComponent={SlideTransition}
            >
                <Alert
                    severity="error"
                    onClose={() => setApiError(prev => ({ ...prev, show: false }))}
                >
                    {`Error: ${apiError.message}`}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default FormConstructor