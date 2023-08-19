import {
  EntitiesResponseSchema,
  NewsArticleResponseSchema,
  SuggestionsResponseSchema,
  TrendingTopicsResponseSchema,
} from "@/schema/bing"
import { fetchBing } from "@/utils/bing"

export async function fetchTopics() {
  const result = await fetchBing("TOPICS", {
    since: `${Date.now() - 1000 * 60 * 60 * 24}`,
  })
  return TrendingTopicsResponseSchema.parse(result).value
}

export async function fetchSuggestions(q: string) {
  const result = await fetchBing("AUTOSUGGEST", { q })
  return SuggestionsResponseSchema.parse(result).suggestionGroups
}

export async function fetchNews(q: string) {
  const result = await fetchBing("NEWS", {
    q,
    count: "100",
    freshness: "Month",
    textDecorations: "True",
  })
  return NewsArticleResponseSchema.parse(result).value
}

export async function fetchEntities(q: string) {
  const result = await fetchBing("ENTITIES", { q })
  return EntitiesResponseSchema.parse(result).entities?.value ?? []
}
