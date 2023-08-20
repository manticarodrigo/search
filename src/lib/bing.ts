import {
  SuggestionsResponseSchema,
  TrendingTopicsResponseSchema,
} from "@/schema/bing"
import { fetchBing } from "@/utils/bing"

export async function fetchSuggestions(q: string) {
  const result = await fetchBing("AUTOSUGGEST", {
    q,
  })
  return SuggestionsResponseSchema.parse(result)
}

export async function fetchTopics() {
  const result = await fetchBing("TOPICS", {
    since: `${Date.now() - 1000 * 60 * 60 * 24}`,
  })
  return TrendingTopicsResponseSchema.parse(result)
}
