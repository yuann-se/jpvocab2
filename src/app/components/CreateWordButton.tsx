import React, { useRef, useState } from "react"
import { IconButton } from "@mui/material"
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import WordDialog from "./WordDialog/WordDialog"
import Draggable, { DraggableEvent } from "react-draggable";


const CreateWordButton = () => {
    const isDragging = useRef<boolean>(false)

    // required to remove react-draggable warnings
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleClick = () => {
        if (!isDragging.current) {
            setIsDialogOpen(true)
        }
    }

    return (
        <>
            <Draggable
                // defaultPosition={{x: 0, y: 0}}
                onDrag={() => { isDragging.current = true }}
                onStop={() => {
                    setTimeout(() => {
                        isDragging.current = false
                    }, 0);
                }}
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