import { z } from "zod"

import { suggest } from "@/lib/brave"

import { createRouter, protectedProcedure } from "../trpc"

export const appRouter = createRouter({
  suggestions: protectedProcedure.input(z.string()).query(async ({ input }) => {
    const suggestions = await suggest(input)
    return suggestions.results.map((suggestion) => suggestion.query)
  }),
})

export type AppRouter = typeof appRouter
