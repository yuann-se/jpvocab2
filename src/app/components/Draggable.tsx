import { useEffect, useRef, useState } from "react"


const Draggable = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const [pressed, setPressed] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const ref = useRef<HTMLDivElement>(null)

    // Monitor changes to position state and update DOM
    useEffect(() => {
        if (ref.current) {
            ref.current.style.transform = `translate(${position.x}px, ${position.y}px)`
        }
    }, [position])

    // Update the current position if mouse is down
    const onMouseMove = (event: React.MouseEvent) => {
        if (pressed) {
            setPosition({
                x: position.x + event.movementX,
                y: position.y + event.movementY
            })
        }
    }

    return (
        <div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
        >
            {children}
        </div>
    )
}

export default Draggable