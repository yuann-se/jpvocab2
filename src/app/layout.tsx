import type { Metadata } from "next";
import "./styles/globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { NextAuthProvider } from "./components/NextAuthProvider";
import { ThemeProvider } from "@mui/material";
import { getServerSession } from "next-auth";
import authOptions from "./lib/authOptions";


export const metadata: Metadata = {
  title: "JPVocab | Home",
};

async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <AppRouterCacheProvider>
            {/* <ThemeProvider theme> */}
            <main>
              {children}
            </main>
            {/* </ThemeProvider> */}
          </AppRouterCacheProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}

export default RootLayout
