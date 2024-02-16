'use client'
import { Button } from '@mui/material'
import { signOut } from 'next-auth/react'
import React from 'react'
import styles from '@/styles/main.module.scss'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function SignOutButton() {
    return (
        <Button
            className={styles.signOutButton}
            onClick={() => signOut()}
        >
            <ExitToAppIcon sx={{ mr: '5px' }} />
            Sign out
        </Button>
    )
}
