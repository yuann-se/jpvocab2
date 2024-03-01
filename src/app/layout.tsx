import type { Metadata, Viewport } from "next";
import "../styles/globals.scss";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { NextAuthProvider } from "./components/NextAuthProvider";
import WordsProvider from "./components/providers/WordsProvider";
import { Noto_Sans, Noto_Sans_JP } from 'next/font/google'

export const metadata: Metadata = {
    title: "JPVocab | Home",
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
}

const noto_sans = Noto_Sans({ subsets: ['latin'], variable: '--font-noto-sans' })
const noto_sans_jp = Noto_Sans_JP({ preload: false, variable: '--font-noto-sans-jp' })

async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${noto_sans.variable} ${noto_sans_jp.variable}`}>
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
