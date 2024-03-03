import React from 'react'
import LoginForm from '../components/LoginForm'
import { Metadata } from 'next';
import '@/styles/main.scss'


export const metadata: Metadata = {
    title: "JPVocab | Login",
}

export default async function page() {
    return (
        <LoginForm />
    )
}
