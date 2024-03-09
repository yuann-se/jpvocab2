import { Box, Chip, Collapse, Grid, Grow, TextField, TextFieldProps } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


type IProps = {
    chipValues: string[],
    onDelete: (event: any) => void,
} & TextFieldProps


const CHIP_EXPAND_DURATION = 300

function InputWithChips({ chipValues, onDelete, ...textFieldProps }: IProps) {

    const [chipsContainerHeight, setChipsContainerHeight] = useState(0)
    const [chipValuesAnimated, setChipValuesAnimated] = useState(chipValues)
    const chipsInnerContainer = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!chipsInnerContainer?.current) return
        setTimeout(() => {
            setChipsContainerHeight(chipsInnerContainer?.current?.clientHeight || 0)
        }, CHIP_EXPAND_DURATION);

    }, [chipValues, chipValuesAnimated])

    useEffect(() => {
        // debugger
        if (chipValuesAnimated.length === chipValues.length) return

        setTimeout(() => {
            setChipValuesAnimated(chipValues)
        }, CHIP_EXPAND_DURATION)

    }, [chipValues])


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return
        const target = e.target as HTMLInputElement
        const newValue = target.value.trim()
        if (!newValue) return
        if (chipValuesAnimated.includes(target.value)) return

        setChipValuesAnimated(prev => ([...prev, newValue]))

        setTimeout(() => {
            textFieldProps.onKeyDown?.(e)
        }, 0);
    }

    return (
        <Box
            component={'form'}
            noValidate
            autoComplete='off'
            onSubmit={(e) => e.preventDefault()}
        >
            <TextField
                value={textFieldProps.value}
                onChange={textFieldProps.onChange}
                onKeyDown={handleKeyDown}
                margin="normal"
                variant='filled'
                fullWidth
                label={textFieldProps.label}
                name={textFieldProps.name}
                disabled={textFieldProps.disabled}
            />

            <Box
                className='chipsOuterContainer'
                sx={{ height: chipsContainerHeight }}
            >
                <Box
                    className='chipsInnerContainer'
                    ref={chipsInnerContainer}
                >
                    {chipValuesAnimated.map((text, ind) =>
                        <Collapse
                            key={text}
                            orientation='horizontal'
                            in={chipValues.includes(text)}
                            timeout={CHIP_EXPAND_DURATION}
                        >
                            {/* <Grow in={chipValues.includes(text)}> */}
                            <Chip
                                onDelete={() => onDelete(text)}
                                label={text}
                                variant='outlined'
                                color="primary"
                                disabled={textFieldProps.disabled}
                                deleteIcon={<HighlightOffOutlinedIcon />}
                            // deleteIcon={<CloseRoundedIcon />}
                            />
                            {/* </Grow> */}
                        </Collapse>
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default InputWithChips