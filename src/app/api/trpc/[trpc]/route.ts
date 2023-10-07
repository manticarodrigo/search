import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

import { appRouter } from "./routers/app"

const handler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: function (): // opts: FetchCreateContextFnOptions,
    object | Promise<object> {
      return {}
    },
  })
}

export { handler as GET, handler as POST }
