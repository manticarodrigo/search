import { z } from "zod"

import { fetchSuggestions } from "@/lib/bing"

import { createRouter, protectedProcedure } from "../trpc"

export const router = createRouter({
  suggest: protectedProcedure.input(z.string()).query(async ({ input }) => {
    return fetchSuggestions(input)
  }),
})
