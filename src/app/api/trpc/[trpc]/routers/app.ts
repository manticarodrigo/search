import { createRouter } from "../trpc"
import { router as autosuggest } from "./autosuggest"

export const appRouter = createRouter({
  autosuggest,
})

export type AppRouter = typeof appRouter
