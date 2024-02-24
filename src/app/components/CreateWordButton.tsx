import React, { useCallback, useEffect, useRef, useState } from "react"
import { IconButton } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle'
import WordDialog from "./WordDialog/WordDialog"


interface IDragPosition {
    dragStartLeft: number,
    dragStartTop: number,
    dragStartX: number,
    dragStartY: number
}

const CreateWordButton = () => {
    const elemRef = useRef<HTMLDivElement>(null)
    const dragPosition = useRef<IDragPosition | null>(null)
    const isDragging = useRef(false)

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const initialiseDrag = (event: React.MouseEvent) => {
        // debugger
        if (!elemRef?.current) return
        const homePage = document.getElementById('homePage')
        if (!homePage) return

        const { clientX, clientY } = event
        const { offsetTop, offsetLeft } = elemRef.current
        const { left, top } = elemRef.current.getBoundingClientRect()

        dragPosition.current = {
            dragStartLeft: left - offsetLeft,
            dragStartTop: top - offsetTop,
            dragStartX: clientX,
            dragStartY: clientY
        }

        homePage.addEventListener('mousemove', startDragging)
        homePage.addEventListener('mouseup', stopDragging)
    }

    const startDragging = useCallback(({ clientX, clientY }: { clientX: number, clientY: number }) => {
        // debugger
        if (!elemRef?.current) return
        if (!dragPosition?.current) return

        isDragging.current = true

        const { dragStartLeft, dragStartX, dragStartTop, dragStartY } = dragPosition.current

        const positionX = dragStartLeft + clientX - dragStartX
        const positionY = dragStartTop + clientY - dragStartY

        elemRef.current.style.transform = `translate(${positionX}px, ${positionY}px)`
    }, [])

    const stopDragging = useCallback(() => {
        const homePage = document.getElementById('homePage')
        if (!homePage) return

        homePage.removeEventListener('mousemove', startDragging)
        homePage.removeEventListener('mouseup', stopDragging)

        setTimeout(() => {
            isDragging.current = false
        }, 0);
    }, [])

    const handleClick = () => {
        if (!isDragging.current) {
            setIsDialogOpen(true)
        }
    }

    return (
        <>
            <div
                onMouseDown={initialiseDrag}
                ref={elemRef}
                style={{ display: 'inline-block' }}
            >
                <IconButton
                    color='secondary'
                    onClick={handleClick}
                >
                    <AddCircleIcon sx={{ width: '60px', height: '60px' }} />
                </IconButton>
            </div>

            <WordDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                variant='create'
            />
        </>
    )
}

export default CreateWordButton