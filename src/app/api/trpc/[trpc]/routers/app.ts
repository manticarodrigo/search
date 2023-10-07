import { realTimeTrends } from "google-trends-api"
import { z } from "zod"

import { RealtimeTrendResponseSchema } from "@/schema/trends"
import { suggest } from "@/lib/brave"

import { createRouter, protectedProcedure } from "../trpc"

async function fetchRealtimeTrends() {
  const trends = await new Promise((resolve, reject) => {
    realTimeTrends({ geo: "US" }, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(res))
      }
    })
  })
  return RealtimeTrendResponseSchema.parse(trends)
}

export const appRouter = createRouter({
  suggestions: protectedProcedure.input(z.string()).query(async ({ input }) => {
    if (input) {
      const suggestions = await suggest(input)
      return suggestions.results.map((suggestion) => suggestion.query)
    } else {
      const suggestions = await fetchRealtimeTrends()
      return suggestions.storySummaries.trendingStories.flatMap((story) =>
        story.entityNames.map((entity) => entity)
      )
    }
  }),
})

export type AppRouter = typeof appRouter
