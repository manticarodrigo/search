import { z } from "zod"

export const NewsTopicSchema = z.object({
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

export const NewsArticleSchema = z.object({
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

export const SearchActionSchema = z.object({
  _type: z.literal("SearchAction"),
  url: z.string().url(),
  displayText: z.string(),
  query: z.string(),
  searchKind: z.string(),
})

export const SuggestionGroupSchema = z.object({
  _type: z.literal("Suggestions/SuggestionGroup"),
  name: z.string(),
  searchSuggestions: SearchActionSchema.array(),
})
