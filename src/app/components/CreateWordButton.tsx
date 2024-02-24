import React, { useCallback, useRef, useState } from "react"
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

    const initialiseDrag = (event: React.MouseEvent | React.TouchEvent) => {
        // debugger
        if (!elemRef?.current) return
        const homePage = document.getElementById('homePage')
        if (!homePage) return

        let clientX, clientY
        if (event.type === 'mousedown') {
            clientX = (event as React.MouseEvent).clientX
            clientY = (event as React.MouseEvent).clientY
        } else {
            clientX = (event as React.TouchEvent).touches[0].clientX
            clientY = (event as React.TouchEvent).touches[0].clientY
        }

        const { offsetTop, offsetLeft } = elemRef.current
        const { left, top } = elemRef.current.getBoundingClientRect()

        dragPosition.current = {
            dragStartLeft: left - offsetLeft,
            dragStartTop: top - offsetTop,
            dragStartX: clientX,
            dragStartY: clientY
        }

        if (event.type === 'mousedown') {
            homePage.addEventListener('mousemove', startDragging)
            homePage.addEventListener('mouseup', stopDragging)
        } else {
            homePage.addEventListener('touchmove', startDragging)
            homePage.addEventListener('touchend', stopDragging)
        }
    }

    const startDragging = useCallback((event: MouseEvent | TouchEvent) => {
        // debugger
        if (!elemRef?.current) return
        if (!dragPosition?.current) return

        isDragging.current = true

        const { dragStartLeft, dragStartX, dragStartTop, dragStartY } = dragPosition.current

        let clientX, clientY
        if (event.type === 'mousedown') {
            clientX = (event as MouseEvent).clientX
            clientY = (event as MouseEvent).clientY
        } else {
            clientX = (event as TouchEvent).touches[0].clientX
            clientY = (event as TouchEvent).touches[0].clientY
        }

        const positionX = dragStartLeft + clientX - dragStartX
        const positionY = dragStartTop + clientY - dragStartY

        elemRef.current.style.transform = `translate(${positionX}px, ${positionY}px)`
    }, [])

    const stopDragging = useCallback((event: MouseEvent | TouchEvent) => {
        const homePage = document.getElementById('homePage')
        if (!homePage) return

        if (event.type === 'mouseup') {
            homePage.removeEventListener('mousemove', startDragging)
            homePage.removeEventListener('mouseup', stopDragging)
        } else {
            homePage.removeEventListener('touchmove', startDragging)
            homePage.removeEventListener('touchend', stopDragging)
        }

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
                onTouchStart={initialiseDrag}
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