import { z } from "zod"

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
      image: z.object({
        _type: z.literal("ImageObject"),
        thumbnail: z.object({
          _type: z.literal("ImageObject"),
          contentUrl: z.string().url(),
        }),
      }).optional(),
    })
  ),
  datePublished: z.string().pipe(z.coerce.date()),
})

const baseUrl = "https://bing-news-search1.p.rapidapi.com/news/search"

const params = new URLSearchParams({
  q: "Flint water crisis",
  count: "100",
  freshness: "Month",
  mkt: "en-US",
  setLang: "EN",
  textFormat: "Raw",
  textDecorations: "True",
})

const url = `${baseUrl}?${params}`

const options = {
  method: "GET",
  headers: {
    "X-BingApis-SDK": "true",
    "X-RapidAPI-Key": process.env.RAPIDAPI_API_KEY ?? "",
    "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
  },
}

export async function fetchNews() {
  const response = await fetch(url, options)
  const result = await response.text()
  console.log(result)
  return NewsArticleSchema.array().parse(JSON.parse(result).value)
}
