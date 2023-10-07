"use client"

import { useEffect, useState } from "react"

import { DailyTrendResponseSchema } from "@/schema/trends"
import { Badge } from "@/components/ui/badge"

export function Trends() {
  const [topics, setTopics] = useState<null | { name: string }[]>(null)

  useEffect(() => {
    fetch("/api/trends/daily")
      .then(async (res) => {
        const body = await res.json()
        const parsed = DailyTrendResponseSchema.parse(body)
        setTopics(
          parsed.default.trendingSearchesDays.flatMap((day) =>
            day.trendingSearches.map((trend) => ({
              name: trend.title.query,
            }))
          )
        )
      })
      .catch((err) => {
        console.error("trends err", err)
      })
  }, [])

  return (
    <>
      {topics && (
        <ul className="flex flex-wrap justify-center gap-2 px-4">
          {topics.map((topic, idx) => (
            <Badge variant="secondary" key={`${topic.name}-${idx}`}>
              {topic.name}
            </Badge>
          ))}
        </ul>
      )}
    </>
  )
}
