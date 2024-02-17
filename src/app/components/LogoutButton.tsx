'use client'
import { Button } from '@mui/material'
import { signOut } from 'next-auth/react'
import React from 'react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { typographyLight } from '@/themes/lightTheme';

export default function LogoutButton() {
    return (
        <Button
            onClick={() => signOut()}
            sx={{ color: typographyLight }}

        >
            <ExitToAppIcon sx={{ mr: '5px' }} />
            Logout
        </Button>
    )
}
