import { z } from "zod"

const TopicSchema = z.object({
  _type: z.literal("News/Topic"),
  webSearchUrl: z.string().url(),
  name: z.string(),
  image: z
    .object({
      _type: z.literal("ImageObject"),
      url: z.string().url(),
      provider: z.array(
        z.object({
          _type: z.literal("Organization"),
          name: z.string(),
        })
      ),
    })
    .optional(),
  isBreakingNews: z.boolean(),
  query: z.object({
    _type: z.literal("Query"),
    text: z.string(),
  }),
  newsSearchUrl: z.string().url(),
})

const NewsArticleSchema = z.object({
  _type: z.literal("NewsArticle"),
  name: z.string(),
  url: z.string().url(),
  image: z
    .object({
      _type: z.literal("ImageObject"),
      thumbnail: z.object({
        _type: z.literal("ImageObject"),
        contentUrl: z.string().url(),
        width: z.number(),
        height: z.number(),
      }),
    })
    .optional(),
  description: z.string(),
  provider: z.array(
    z.object({
      _type: z.literal("Organization"),
      name: z.string(),
      image: z
        .object({
          _type: z.literal("ImageObject"),
          thumbnail: z.object({
            _type: z.literal("ImageObject"),
            contentUrl: z.string().url(),
          }),
        })
        .optional(),
    })
  ),
  datePublished: z.string().pipe(z.coerce.date()),
})

const baseUrl = "https://bing-news-search1.p.rapidapi.com/news"

const params = {
  count: "100",
  mkt: "en-US",
  setLang: "EN",
  textFormat: "Raw",
  textDecorations: "True",
}

const options = {
  method: "GET",
  headers: {
    "X-BingApis-SDK": "true",
    "X-RapidAPI-Key": process.env.RAPIDAPI_API_KEY ?? "",
    "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
  },
}

export async function fetchTopics() {
  const url = `${baseUrl}/trendingtopics?${new URLSearchParams({
    ...params,
    since: `${Date.now() - 1000 * 60 * 60 * 24}`,
  })}`
  const response = await fetch(url, options)
  const result = await response.text()
  return TopicSchema.array().parse(JSON.parse(result).value)
}

export async function fetchNews() {
  const url = `${baseUrl}/search?${new URLSearchParams({
    ...params,
    q: "Flint water crisis",
    freshness: "Month",
  })}`
  const response = await fetch(url, options)
  const result = await response.text()
  return NewsArticleSchema.array().parse(JSON.parse(result).value)
}
