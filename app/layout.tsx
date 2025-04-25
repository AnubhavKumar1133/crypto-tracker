'use client'
import type React from "react"
import { Provider } from "react-redux"
import { store } from "@/lib/store"
import { ThemeProvider } from "@/components/theme-provider"
import "@/app/globals.css"
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Provider store={store}>{children}</Provider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
