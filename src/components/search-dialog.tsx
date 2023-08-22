"use client"

import { useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CommandShortcut } from "@/components/ui/command"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { SearchForm } from "@/components/search"

export function SearchDialog() {
  const params = useParams()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const query =
    typeof params.query === "string"
      ? decodeURIComponent(params.query)
      : undefined

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        buttonRef.current?.click()
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          ref={buttonRef}
          variant="outline"
          className="min-w-0 grow justify-start overflow-hidden px-3 sm:w-96"
        >
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <div className="min-w-0 truncate">{query}</div>
          <CommandShortcut>⌘K</CommandShortcut>
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <SearchForm
          initialQuery={query}
          onSubmit={() => buttonRef.current?.click()}
        />
      </DialogContent>
    </Dialog>
  )
}
