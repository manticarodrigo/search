import React from "react"
import Image from "next/image"
import Link from "next/link"

import { ModeToggle } from "./mode-toggle"

export function Header({ children }: React.PropsWithChildren) {
  return (
    <header className="w-full border-b">
      <div className="container flex w-full items-center justify-between p-2">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/logo.svg"
            alt="logo"
            width={20}
            height={20}
            // className="saturate-0"
          />
          <span className="font-mono font-bold">Synopsis</span>
        </Link>
        {children}
        <ModeToggle />
      </div>
    </header>
  )
}
