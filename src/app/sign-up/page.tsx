import React from 'react'
import SignUpForm from '../components/SignUpForm'
import { Metadata } from 'next'
import '@/styles/main.scss'


export const metadata: Metadata = {
    title: "JPVocab | Sign up",
}

export default function page() {
    return (
        <SignUpForm />
    )
}