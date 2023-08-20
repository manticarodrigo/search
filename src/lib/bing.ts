import {
  EntitiesResponseSchema,
  NewsArticleResponseSchema,
  SearchResponseSchema,
  SuggestionsResponseSchema,
  TrendingTopicsResponseSchema,
} from "@/schema/bing"
import { fetchBing } from "@/utils/bing"

export async function fetchEntities(q: string) {
  const result = await fetchBing("ENTITIES", {
    q,
  })
  return EntitiesResponseSchema.parse(result)
}

export async function fetchNews(q: string) {
  const result = await fetchBing("NEWS", {
    q,
    count: "50",
    freshness: "Month",
    textDecorations: "True",
  })
  return NewsArticleResponseSchema.parse(result)
}

export async function fetchSearch(q: string) {
  const result = await fetchBing("SEARCH", {
    q,
    count: "50",
    freshness: "Month",
    textDecorations: "True",
    responseFilter: "webpages",
  })
  return SearchResponseSchema.parse(result)
}

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
