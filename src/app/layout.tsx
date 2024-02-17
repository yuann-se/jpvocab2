import type { Metadata } from "next";
import "../styles/globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { NextAuthProvider } from "./components/NextAuthProvider";
import { CssBaseline, ThemeProvider } from "@mui/material";
import lightTheme from "../themes/lightTheme";
import WordsProvider from "./components/providers/WordsProvider";


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
