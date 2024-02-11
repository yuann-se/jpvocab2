import { Box, Button, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import Link from "next/link";
import authOptions from "./lib/authOptions";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default async function Home() {
    // const session = await getServerSession(authOptions)
    // const router = useRouter()

    // if (!session) {
    //     router.push('/login')
    // }

    return (
        <Box>
            {/* <Link href={'/login'}>Login</Link> */}
            <Typography>Home</Typography>
            {/* {JSON.stringify(session)} */}
        </Box>
    );
}

// export async function getServerSideProps({ req, res }) {
//     const session = await getSession({ req });
//     if (!session) {
//       return {
//         redirect: {
//           destination: '/',
//           permanent: false,
//         },
//       }
//     }
//     return {
//       props: {},
//     };
//   }

// export async function getServerSideProps(context) {
//     return {
//       props: {
//         session: await getServerSession(
//           context.req,
//           context.res,
//           authOptions
//         ),
//       },
//     }
//   }
