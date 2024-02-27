import type { Metadata, Viewport } from "next";
import "../styles/globals.scss";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { NextAuthProvider } from "./components/NextAuthProvider";
import WordsProvider from "./components/providers/WordsProvider";
import '@fontsource-variable/noto-sans-jp';
import '@fontsource-variable/noto-sans';


export const metadata: Metadata = {
    title: "JPVocab | Home",
    viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
}

async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body>
                <NextAuthProvider>
                    <AppRouterCacheProvider>
                        <WordsProvider>
                            <main>
                                {children}
                            </main>
                        </WordsProvider>
                    </AppRouterCacheProvider>
                </NextAuthProvider>
            </body>
        </html>
    );
}

export default RootLayout
