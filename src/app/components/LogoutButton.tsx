'use client'
import { Button } from '@mui/material'
import { signOut } from 'next-auth/react'
import React from 'react'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'

export default function LogoutButton() {
    return (
        <Button
            onClick={() => signOut()}
            className='logoutButton'
        >
            <ExitToAppRoundedIcon sx={{ mr: '5px' }} />
            Logout
        </Button>
    )
}
