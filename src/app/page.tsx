import { Box, Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
    return (
        <Box>
            <Link href={'/login'}>Login</Link>
            {/* <Button onClick={async () => {
        const response = await fetch('/api/user', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: 'test',
          })
        })

        if (response.ok) {
          console.log('deleted')
        } else {
          console.log(response)
        }
      }}
      >
        delete
      </Button> */}
        </Box>
    );
}
