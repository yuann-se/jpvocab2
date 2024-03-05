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
        setChipsContainerHeight(chipsInnerContainer.current.clientHeight)

        setTimeout(() => {
            setChipValuesAnimated(chipValues)
        }, chipValues.length >= chipValuesAnimated.length
            ? 0
            : CHIP_EXPAND_DURATION)
    }, [chipValues, chipValuesAnimated.length])

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
                onKeyDown={textFieldProps.onKeyDown}
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
                <Grid
                    container
                    spacing={1}
                    ref={chipsInnerContainer}
                    sx={{ mt: 0 }}
                >
                    {chipValuesAnimated.map((text, ind) =>
                        <Grid key={ind} item>
                            <Collapse
                                orientation='horizontal'
                                in={chipValues.includes(text)}
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
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Box>
    )
}

export default InputWithChips