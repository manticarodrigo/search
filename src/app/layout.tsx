import React from "react"

import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import NextTopLoader from "nextjs-toploader"

import { Providers } from "@/components/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Search",
  description:
    "An AI-powered search aggregator empowering intelligent discovery.",
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className="h-full w-full" suppressHydrationWarning>
      <body className={`${inter.className} h-full w-full overflow-auto`}>
        <Providers>{children}</Providers>
        <NextTopLoader height={4} color="#eab308" showSpinner={false} />
        <Analytics />
      </body>
    </html>
  )
}
