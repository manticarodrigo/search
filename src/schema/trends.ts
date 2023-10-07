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

export const DailyTrendResponseSchema = z.object({
  default: z.object({
    trendingSearchesDays: z.array(TrendingSearchesDaySchema),
    endDateForNextRequest: z.string(),
    rssFeedPageUrl: z.string(),
  }),
})

const StoryArticleSchema = z.object({
  articleTitle: z.string(),
  url: z.string(),
  source: z.string(),
  time: z.string(),
  snippet: z.string(),
})

const StoryImageSchema = z.object({
  newsUrl: z.string(),
  source: z.string(),
  imgUrl: z.string(),
})

const StoryDetailsSchema = z.object({
  image: StoryImageSchema,
  shareUrl: z.string(),
  articles: z.array(StoryArticleSchema),
  idsForDedup: z.array(z.string()),
  id: z.string(),
  title: z.string(),
  entityNames: z.array(z.string()),
})

export const RealtimeTrendResponseSchema = z.object({
  featuredStoryIds: z.array(z.string()),
  trendingStoryIds: z.array(z.string()),
  storySummaries: z.object({
    featuredStories: z.array(z.any()),
    trendingStories: z.array(StoryDetailsSchema),
  }),
})
