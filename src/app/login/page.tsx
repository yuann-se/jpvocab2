import React from 'react'
import LoginForm from '../components/LoginForm'
import { getServerSession } from 'next-auth'
import authOptions from '../lib/authOptions'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "JPVocab | Login",
}

export default async function page() {
    // const session = await getServerSession(authOptions)

    // console.log('page.tsx', session)
    return (
        <LoginForm />
    )
}
