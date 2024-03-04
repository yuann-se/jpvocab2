'use client'
import React, { useEffect, useRef, useState } from "react"
import { IconButton } from "@mui/material"
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import WordDialog from "./WordDialog/WordDialog"
import Draggable, { DraggableEventHandler } from "react-draggable";
import { usePreferencesContext } from "./providers/PreferencesProvider";


const CreateWordButton = () => {
    const isDragging = useRef<boolean>(false)

    // required to remove react-draggable warnings
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const { preferences, updatePreferences } = usePreferencesContext()

    const handleClick = () => {
        if (!isDragging.current) {
            setIsDialogOpen(true)
        }
    }

    const handleDragStop: DraggableEventHandler = (e, { x, y }) => {
        setTimeout(() => {
            isDragging.current = false
        }, 0)

        const relativeX = x / window.innerWidth
        const relativeY = y / window.innerHeight

        updatePreferences({ createButtonPosition: { x: relativeX, y: relativeY } })
    }

    if (!preferences) return null

    console.log(preferences)

    return (
        <>
            <Draggable
                defaultPosition={{
                    x: window.innerWidth * preferences.createButtonPosition.x,
                    y: window.innerHeight * preferences.createButtonPosition.y
                }}
                onDrag={() => {
                    isDragging.current = true
                }}
                onStop={handleDragStop}
                bounds={'#homePage'}
                nodeRef={buttonRef}
            >
                <IconButton
                    className="createWordButton"
                    onClick={handleClick}
                    ref={buttonRef}
                >
                    <AddCircleRoundedIcon />
                </IconButton>
            </Draggable>

            <WordDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                variant='create'
            />
        </>
    )
}

export default CreateWordButton