"use client"

import { useState } from "react"
import { useCompletion } from "ai/react"
import { z } from "zod"

import { SearchResponseSchema } from "@/schema/brave"
import { useEffectOnce } from "@/hooks/use-effect-once"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
  results: z.infer<typeof SearchResponseSchema>
}

export function SearchSummary({ results }: Props) {
  const [text, setText] = useState("")

  const { completion, complete, isLoading } = useCompletion({
    api: "/api/chat",
  })

  useEffectOnce(() => {
    if (!isLoading) {
      const payload = JSON.stringify({
        query: results.query?.original,
        results: {
          web: results.web?.results.map((result) => ({
            title: result.title,
            url: result.url,
            description: result.description,
            extra_snippets: result.extra_snippets,
          })),
          news: results.news?.results.map((result) => ({
            title: result.title,
            url: result.url,
            description: result.description,
          })),
        },
      })
      complete(`
        The following is the response for a search engine query:
        ${payload}
        
        Provide an overall analysis of the search results.
      `).then((res) => {
        setText(res ?? "")
      })
    }
  })

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col gap-2">
        <CardTitle>Brief</CardTitle>
      </CardHeader>
      <CardContent className="h-full min-h-0 whitespace-pre-line">
        {text || completion}
      </CardContent>
    </Card>
  )
}
