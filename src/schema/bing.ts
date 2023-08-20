import { z } from "zod"

export const TrendingTopicsResponseSchema = z.object({
  value: z
    .object({
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
    .array(),
})

export const NewsArticleResponseSchema = z.object({
  value: z
    .object({
      name: z.string(),
      url: z.string().url(),
      image: z
        .object({
          thumbnail: z.object({
            contentUrl: z.string().url(),
            width: z.number(),
            height: z.number(),
          }),
        })
        .optional(),
      description: z.string(),
      provider: z.array(
        z.object({
          name: z.string(),
          image: z
            .object({
              thumbnail: z.object({
                contentUrl: z.string().url(),
              }),
            })
            .optional(),
        })
      ),
      datePublished: z.string().pipe(z.coerce.date()),
    })
    .array(),
})

export const SuggestionsResponseSchema = z.object({
  queryContext: z.object({
    originalQuery: z.string(),
  }),
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

export const EntitiesResponseSchema = z.object({
  queryContext: z.object({
    originalQuery: z.string(),
    askUserForLocation: z.boolean().optional(),
  }),
  entities: z
    .object({
      value: z.array(
        z.object({
          id: z.string().url(),
          contractualRules: z.array(
            z.union([
              z.object({
                targetPropertyName: z.string(),
                mustBeCloseToContent: z.boolean(),
                license: z.object({
                  name: z.string(),
                  url: z.string().url(),
                }),
                licenseNotice: z.string(),
              }),
              z.object({
                targetPropertyName: z.string(),
                mustBeCloseToContent: z.boolean(),
                text: z.string(),
                url: z.string().url(),
              }),
              z.object({
                targetPropertyName: z.string(),
                mustBeCloseToContent: z.boolean(),
                url: z.string().url(),
              }),
            ])
          ),
          webSearchUrl: z.string().url(),
          name: z.string(),
          url: z.string().url().optional(),
          image: z
            .object({
              name: z.string(),
              thumbnailUrl: z.string().url(),
              provider: z.array(
                z.object({
                  url: z.string().url(),
                })
              ),
              hostPageUrl: z.string().url(),
              width: z.number(),
              height: z.number(),
              sourceWidth: z.number(),
              sourceHeight: z.number(),
            })
            .optional(),
          description: z.string(),
          entityPresentationInfo: z.object({
            entityScenario: z.string(),
            entityTypeHints: z.array(z.string()),
            entityTypeDisplayHint: z.string().optional(),
          }),
          bingId: z.string(),
        })
      ),
    })
    .optional(),
  rankingResponse: z.object({
    sidebar: z
      .object({
        items: z.array(
          z.object({
            answerType: z.string(),
            resultIndex: z.number().optional(),
            value: z
              .object({
                id: z.string().url(),
              })
              .optional(),
          })
        ),
      })
      .optional(),
  }),
})

export const SearchResponseSchema = z.object({
  webPages: z.object({
    webSearchUrl: z.string().url(),
    totalEstimatedMatches: z.number(),
    value: z.array(
      z.object({
        id: z.string().url(),
        name: z.string(),
        url: z.string().url(),
        snippet: z.string(),
        isNavigational: z.boolean(),
        isFamilyFriendly: z.boolean(),
        dateLastCrawled: z.string().pipe(z.coerce.date()),
        deepLinks: z
          .array(
            z.object({
              name: z.string(),
              url: z.string().url(),
              snippet: z.string(),
            })
          )
          .optional(),
      })
    ),
  }),
})
