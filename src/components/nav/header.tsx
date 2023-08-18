import { ModeToggle } from "./mode-toggle"

export function Header() {
  return (
    <header className="flex w-full items-center justify-between border-b p-2">
      <h1 className="text-lg font-light">Synopsis</h1>
      <ModeToggle />
    </header>
  )
}
