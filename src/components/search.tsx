"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next-nprogress-bar"
import { useForm } from "react-hook-form"
import { useDebounce } from "use-debounce"
import * as z from "zod"

import { trpc } from "@/lib/trpc"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Form, FormField } from "@/components/ui/form"

import { Skeleton } from "./ui/skeleton"

const FormSchema = z.object({
  query: z.string({
    required_error: "Please enter a search query to continue.",
  }),
})

type FormValues = z.infer<typeof FormSchema>

export function Search() {
  const router = useRouter()
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      query: "",
    },
  })

  const query = form.watch("query")
  const [term] = useDebounce(query, 500)
  const suggestions = trpc.autosuggest.suggest.useQuery(term, {
    keepPreviousData: true,
  })

  const isPending = term !== query || suggestions.isLoading

  function onSubmit(values: FormValues) {
    router.push(`/search?query=${values.query}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <Command className="rounded-lg border shadow-md">
              <CommandInput
                {...field}
                placeholder="Type something to get started..."
                onValueChange={(v) => form.setValue("query", v)}
              />
              <CommandList>
                <CommandEmpty className="items-start p-0">
                  {isPending ? (
                    <div className="flex h-[300px] flex-col gap-2 p-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  ) : (
                    <div className="p-2">No results found.</div>
                  )}
                </CommandEmpty>
                {suggestions.data?.map((group, idx) => (
                  <CommandGroup key={`${group.name}-${idx}`}>
                    {group.searchSuggestions.map((suggestion, idx) => (
                      <CommandItem
                        key={`${suggestion.query}-${idx}`}
                        onSelect={(v) => {
                          form.setValue("query", v)
                          form.handleSubmit(onSubmit)()
                        }}
                      >
                        {suggestion.displayText}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          )}
        />
      </form>
    </Form>
  )
}
