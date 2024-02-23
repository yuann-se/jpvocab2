import { Box, CircularProgress, CircularProgressProps, Typography } from "@mui/material";

export default function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
) {
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'inline-flex',
                margin: '0 auto'
            }}
        >
            <CircularProgress variant="determinate" {...props} />
            <CircularProgress
                variant="determinate"
                value={100}
                sx={{
                    position: 'absolute',
                    color: 'secondary.light'
                }}
            />

            <Box
                sx={{
                    inset: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                >
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    )
}
