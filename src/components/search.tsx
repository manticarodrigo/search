"use client"

import { useState } from "react"
import { useDebounce } from "use-debounce"

import { trpc } from "@/lib/trpc"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export function Search() {
  const [query, setQuery] = useState("")
  const [term] = useDebounce(query, 500)
  const suggestions = trpc.autosuggest.suggest.useQuery(term)
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput
        value={query}
        placeholder="Type something to get started..."
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>
          {suggestions.isLoading ? "Loading..." : "No results found."}
        </CommandEmpty>
        {suggestions.data?.map((group, idx) => (
          <CommandGroup key={`${group.name}-${idx}`} heading={group.name}>
            {group.searchSuggestions.map((suggestion, idx) => (
              <CommandItem key={`${suggestion.query}-${idx}`}>
                {suggestion.displayText}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </Command>
  )
}
