import React from "react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

import { ModeToggle } from "./mode-toggle"

export function Header({ children }: React.PropsWithChildren) {
  return (
    <header className="w-full border-b">
      <div className="container flex w-full items-center justify-between gap-2 p-2">
        <Link href="/" className="hidden items-center gap-1 sm:flex">
          <Image src="/logo.svg" alt="logo" width={20} height={20} />
          <span className="font-mono font-bold">Synopsis</span>
        </Link>
        <Button asChild variant="outline" className="sm:hidden" size="icon">
          <Link href="/" aria-label="Synopsis">
            <Image src="/logo.svg" alt="logo" width={20} height={20} />
          </Link>
        </Button>
        {children}
        <ModeToggle />
      </div>
    </header>
  )
}
