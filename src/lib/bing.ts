import {
  NewsArticleSchema,
  NewsTopicSchema,
  SuggestionGroupSchema,
} from "@/schema/bing"
import { fetchBing } from "@/utils/bing"

export async function fetchTopics() {
  const result = await fetchBing("TOPICS", {
    since: `${Date.now() - 1000 * 60 * 60 * 24}`,
  })
  return NewsTopicSchema.array().parse(result.value)
}

export async function fetchSuggestions(q: string) {
  const result = await fetchBing("AUTOSUGGEST", { q })
  return SuggestionGroupSchema.array().parse(result.suggestionGroups)
}

export async function fetchNews(q: string) {
  const result = await fetchBing("NEWS", {
    q,
    count: "100",
    freshness: "Month",
    textDecorations: "True",
  })
  return NewsArticleSchema.array().parse(result.value)
}
