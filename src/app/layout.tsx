import React from "react"

import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const runtime = "edge"

export const metadata: Metadata = {
  title: "Synopsis",
  description: "Smart news search engine",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full w-full">
      <body className={`${inter.className} h-full w-full overflow-auto`}>
        {children}
      </body>
    </html>
  )
}
