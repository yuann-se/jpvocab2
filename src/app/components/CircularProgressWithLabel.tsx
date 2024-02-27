import { Box, CircularProgress, CircularProgressProps, Typography } from "@mui/material";

export default function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
) {
    return (
        <Box className='circularProgressWithLabel'>
            <CircularProgress variant="determinate" {...props} />
            <CircularProgress
                variant="determinate"
                value={100}
                className="backgroundCircle"
            />

            <Box className='foregroundCircle'>
                <Typography
                    variant="caption"
                    color="text.secondary"
                >
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    )
}
