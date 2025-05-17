import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Providers } from "./Providers"

export const metadata: Metadata = {
  title: "Web3 Staking Platform",
  description: "A modern Web3 platform for staking, DeFi, and token swaps",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
