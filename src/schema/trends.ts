import { z } from "zod"

const RelatedQuerySchema = z.object({
  query: z.string(),
  exploreLink: z.string(),
})

const ImageSchema = z.object({
  newsUrl: z.string(),
  source: z.string(),
  imageUrl: z.string(),
})

const ArticleSchema = z.object({
  title: z.string(),
  timeAgo: z.string(),
  source: z.string(),
  image: ImageSchema.optional(),
  url: z.string(),
  snippet: z.string(),
})

const TrendingSearchSchema = z.object({
  title: z.object({
    query: z.string(),
    exploreLink: z.string(),
  }),
  formattedTraffic: z.string(),
  relatedQueries: z.array(RelatedQuerySchema),
  image: ImageSchema.optional(),
  articles: z.array(ArticleSchema),
  shareUrl: z.string(),
})

const TrendingSearchesDaySchema = z.object({
  date: z.string(),
  formattedDate: z.string(),
  trendingSearches: z.array(TrendingSearchSchema),
})

export const TrendResponseSchema = z.object({
  default: z.object({
    trendingSearchesDays: z.array(TrendingSearchesDaySchema),
    endDateForNextRequest: z.string(),
    rssFeedPageUrl: z.string(),
  }),
})
