import React, { useCallback, useRef, useState } from "react"
import { IconButton } from "@mui/material"
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import WordDialog from "./WordDialog/WordDialog"


interface IDragPosition {
    dragStartLeft: number,
    dragStartTop: number,
    dragStartX: number,
    dragStartY: number
}

const CreateWordButton = () => {
    const draggableRef = useRef<HTMLDivElement>(null)
    const droppableRef = useRef<HTMLElement | null>(null)
    const droppableRect = useRef<DOMRect | null>(null)

    const dragPosition = useRef<IDragPosition | null>(null)
    const isDragging = useRef(false)

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const initialiseDrag = (event: React.MouseEvent | React.TouchEvent) => {
        // debugger
        if (!draggableRef?.current) return

        if (!droppableRef.current) {
            droppableRef.current = document.getElementById('homePage')
        }

        if (!droppableRef.current) return
        droppableRect.current = droppableRef.current.getBoundingClientRect()

        let clientX, clientY
        if (event.type === 'mousedown') {
            clientX = (event as React.MouseEvent).clientX
            clientY = (event as React.MouseEvent).clientY
        }

        if (event.type === 'touchstart') {
            clientX = (event as React.TouchEvent).touches[0].clientX
            clientY = (event as React.TouchEvent).touches[0].clientY
        }

        if (typeof clientX !== 'number' || typeof clientY !== 'number') return

        const { offsetTop, offsetLeft } = draggableRef.current
        const { left, top } = draggableRef.current.getBoundingClientRect()

        dragPosition.current = {
            dragStartLeft: left - offsetLeft,
            dragStartTop: top - offsetTop,
            dragStartX: clientX,
            dragStartY: clientY
        }

        if (event.type === 'mousedown') {
            droppableRef.current.addEventListener('mousemove', startDragging)
            droppableRef.current.addEventListener('mouseup', stopDragging)
        } else {
            droppableRef.current.addEventListener('touchmove', startDragging)
            droppableRef.current.addEventListener('touchend', stopDragging)
        }
    }

    const startDragging = useCallback((event: MouseEvent | TouchEvent) => {
        // debugger
        if (!draggableRef?.current) return
        if (!droppableRef?.current) return
        if (!dragPosition?.current) return
        if (!droppableRect?.current) return

        isDragging.current = true

        const { dragStartLeft, dragStartX, dragStartTop, dragStartY } = dragPosition.current

        let clientX, clientY
        if (event.type === 'mousemove') {
            clientX = (event as MouseEvent).clientX
            clientY = (event as MouseEvent).clientY
        }

        if (event.type === 'touchmove') {
            clientX = (event as TouchEvent).touches[0].clientX
            clientY = (event as TouchEvent).touches[0].clientY
        }

        if (typeof clientX !== 'number' || typeof clientY !== 'number') return

        let positionX = dragStartLeft + clientX - dragStartX // if <= 0 make 0 // if > droppableRect.current.width - width make droppableRect.current.width - width 
        let positionY = dragStartTop + clientY - dragStartY // if - dragStartTop <=0 make 0 // if - dragStartTop >= droppableRect.current.height - height make droppableRect.current.height - height

        // const isOnTopBorder = positionY - dragStartTop <= 0
        // const isOnRightBorder = positionX >= containerWidth - elementWidth
        const isOnLeftBorder = positionX <= 0
        // const isOnBottomBorder = positionY - dragStartTop >= containerHeight - elementHeight

        const rect = draggableRef.current.getBoundingClientRect()
        // const rect

        const { bottom, top, height, left, width, right } = rect

        const isOnTopBorder = bottom <= height
        const isOnRightBorder = left + width >= droppableRect.current.width // make droppableRect.current.width - width 
        // const isOnLeftBorder = left <= 0 // make 0
        const isOnBottomBorder = top + height >= droppableRect.current.height

        if (isOnLeftBorder) {
            positionX = 0
        }
        // if (isOnTopBorder) {
        //     positionY = dragStartTop
        // }

        // if (isOnBottomBorder) {
        //     positionY = 
        // }
        console.log(isOnTopBorder, isOnRightBorder, isOnLeftBorder, isOnBottomBorder)

        draggableRef.current.style.transform = `translate(${positionX}px, ${positionY}px)`
    }, [])

    const stopDragging = useCallback((event: MouseEvent | TouchEvent) => {
        if (!droppableRef.current) return

        if (event.type === 'mouseup') {
            droppableRef.current.removeEventListener('mousemove', startDragging)
            droppableRef.current.removeEventListener('mouseup', stopDragging)
        } else {
            droppableRef.current.removeEventListener('touchmove', startDragging)
            droppableRef.current.removeEventListener('touchend', stopDragging)
        }

        setTimeout(() => {
            isDragging.current = false
            droppableRef.current = null
            droppableRect.current = null
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
                ref={draggableRef}
                style={{ display: 'inline-block', touchAction: 'none' }}
            >
                <IconButton
                    className="createWordButton"
                    onClick={handleClick}
                >
                    <AddCircleRoundedIcon />
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