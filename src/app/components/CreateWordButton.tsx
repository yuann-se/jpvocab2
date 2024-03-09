'use client'
import React, { useEffect, useRef, useState } from "react"
import { Fade, IconButton } from "@mui/material"
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import WordDialog from "./WordDialog/WordDialog"
import Draggable, { DraggableEventHandler } from "react-draggable";
import { usePreferencesContext } from "./providers/PreferencesProvider";


const CreateWordButton = () => {
    const isDragging = useRef<boolean>(false)
    const [resizeKey, setResizeKey] = useState(0)

    // required to remove react-draggable warnings
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const { preferences, updatePreferences } = usePreferencesContext()

    useEffect(() => {
        const handleResize = () => {
            setResizeKey(prev => prev + 1)
        }
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    const handleDrag = () => {
        isDragging.current = true
    }

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

    return (
        <>
            <Draggable
                key={resizeKey}
                defaultPosition={{
                    x: window.innerWidth * preferences.createButtonPosition.x,
                    y: window.innerHeight * preferences.createButtonPosition.y
                }}
                onDrag={handleDrag}
                onStop={handleDragStop}
                bounds={'#homePage'}
                nodeRef={buttonRef}
            >
                <Fade in={!!preferences} className="createWordButton">
                    <IconButton
                        className="createWordButton"
                        onClick={handleClick}
                        ref={buttonRef}
                    >
                        <AddCircleRoundedIcon />
                    </IconButton>
                </Fade>
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