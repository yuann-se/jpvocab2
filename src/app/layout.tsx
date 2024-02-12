import type { Metadata } from "next";
import "./styles/globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { NextAuthProvider } from "./components/NextAuthProvider";


export const metadata: Metadata = {
  title: "JPVocab | Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <AppRouterCacheProvider>
            <main>
              {children}
            </main>
          </AppRouterCacheProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
