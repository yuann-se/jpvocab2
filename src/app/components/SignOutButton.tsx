'use client'
import { Button } from '@mui/material'
import { signOut } from 'next-auth/react'
import React from 'react'

export default function SignOutButton() {
    return (
        <Button
            onClick={() => signOut()}
        >
            Sign out
        </Button>
    )
}
