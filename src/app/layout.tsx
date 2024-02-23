import type { Metadata } from "next";
import "../styles/globals.scss";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { NextAuthProvider } from "./components/NextAuthProvider";
import { CssBaseline, ThemeProvider } from "@mui/material";
import lightTheme from "../themes/lightTheme";
import WordsProvider from "./components/providers/WordsProvider";
import '@fontsource-variable/noto-sans-jp';
import '@fontsource-variable/noto-sans';


export const metadata: Metadata = {
    title: "JPVocab | Home",
};

async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body>
                <NextAuthProvider>
                    <AppRouterCacheProvider>
                        <ThemeProvider theme={lightTheme}>
                            <WordsProvider>
                                <main>
                                    <CssBaseline />
                                    {children}
                                </main>
                            </WordsProvider>
                        </ThemeProvider>
                    </AppRouterCacheProvider>
                </NextAuthProvider>
            </body>
        </html>
    );
}

export default RootLayout
