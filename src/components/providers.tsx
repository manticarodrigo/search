"use client"

import React from "react"
import { ThemeProvider } from "next-themes"

import { TrpcProvider } from "@/lib/trpc"

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <TrpcProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </TrpcProvider>
  )
}
