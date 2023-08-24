import { SearchResponseSchema, SuggestResponseSchema } from "@/schema/brave"

export async function search(query: string) {
  const response = await fetch(
    `https://api.search.brave.com/res/v1/web/search?q=${query}&result_filter=web,news&text_decorations=false`,
    {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip",
        "X-Subscription-Token": process.env.BRAVE_SEARCH_API_KEY ?? "",
      },
    }
  )
  const json = await response.json()
  return SearchResponseSchema.parse(json)
}

export async function suggest(query: string) {
  const response = await fetch(
    `https://api.search.brave.com/res/v1/suggest/search?q=${query}&count=20`,
    {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip",
        "X-Subscription-Token": process.env.BRAVE_AUTOSUGGEST_API_KEY ?? "",
      },
    }
  )
  const json = await response.json()
  return SuggestResponseSchema.parse(json)
}
