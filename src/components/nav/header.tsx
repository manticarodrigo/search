import Image from "next/image"

import { ModeToggle } from "./mode-toggle"

export function Header() {
  return (
    <header className="w-full border-b">
      <div className="container flex w-full items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <Image src="/bulb.svg" alt="logo" width={20} height={20} />
          <h1 className="font-mono text-lg font-bold lowercase">Synopsis</h1>
        </div>
        <ModeToggle />
      </div>
    </header>
  )
}
