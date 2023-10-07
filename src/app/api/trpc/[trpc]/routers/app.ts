import { z } from "zod"

import { suggest } from "@/lib/brave"
import { fetchRealtimeTrends } from "@/app/api/trends/realtime/route"

import { createRouter, protectedProcedure } from "../trpc"

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
