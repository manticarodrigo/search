import { z } from "zod"

export const TrendingTopicsResponseSchema = z.object({
  value: z
    .array(
      z.object({
        webSearchUrl: z.string().url(),
        name: z.string(),
        image: z
          .object({
            url: z.string().url(),
            provider: z.array(
              z.object({
                name: z.string(),
              })
            ),
          })
          .optional(),
        isBreakingNews: z.boolean(),
        query: z.object({
          text: z.string(),
        }),
        newsSearchUrl: z.string().url(),
      })
    )
    .optional(),
})

export const SuggestionsResponseSchema = z.object({
  suggestionGroups: z
    .object({
      name: z.string(),
      searchSuggestions: z
        .object({
          url: z.string().url(),
          displayText: z.string(),
          query: z.string(),
          searchKind: z.string(),
        })
        .array(),
    })
    .array(),
})
