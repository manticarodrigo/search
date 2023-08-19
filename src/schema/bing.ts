import { z } from "zod"

export const TrendingTopicsResponseSchema = z.object({
  _type: z.literal("TrendingTopics"),
  value: z
    .object({
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
    .array(),
})

export const NewsArticleResponseSchema = z.object({
  _type: z.literal("News"),
  value: z
    .object({
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
    .array(),
})

export const SuggestionsResponseSchema = z.object({
  _type: z.literal("Suggestions"),
  queryContext: z.object({
    _type: z.literal("QueryContext"),
    originalQuery: z.string(),
  }),
  suggestionGroups: z
    .object({
      _type: z.literal("Suggestions/SuggestionGroup"),
      name: z.string(),
      searchSuggestions: z
        .object({
          _type: z.literal("SearchAction"),
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
  _type: z.literal("SearchResponse"),
  queryContext: z.object({
    _type: z.literal("QueryContext"),
    originalQuery: z.string(),
    askUserForLocation: z.boolean().optional(),
  }),
  entities: z
    .object({
      _type: z.literal("Entities"),
      value: z.array(
        z.object({
          _type: z.literal("Thing"),
          id: z.string().url(),
          contractualRules: z.array(
            z.union([
              z.object({
                _type: z.literal("ContractualRules/LicenseAttribution"),
                targetPropertyName: z.string(),
                mustBeCloseToContent: z.boolean(),
                license: z.object({
                  _type: z.literal("License"),
                  name: z.string(),
                  url: z.string().url(),
                }),
                licenseNotice: z.string(),
              }),
              z.object({
                _type: z.literal("ContractualRules/LinkAttribution"),
                targetPropertyName: z.string(),
                mustBeCloseToContent: z.boolean(),
                text: z.string(),
                url: z.string().url(),
              }),
              z.object({
                _type: z.literal("ContractualRules/MediaAttribution"),
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
              _type: z.literal("ImageObject"),
              name: z.string(),
              thumbnailUrl: z.string().url(),
              provider: z.array(
                z.object({
                  _type: z.literal("Organization"),
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
            _type: z.literal("Entities/EntityPresentationInfo"),
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
    _type: z.literal("Ranking/RankingResponse"),
    sidebar: z
      .object({
        _type: z.literal("Ranking/RankingGroup"),
        items: z.array(
          z.object({
            _type: z.literal("Ranking/RankingItem"),
            answerType: z.string(),
            resultIndex: z.number().optional(),
            value: z
              .object({
                _type: z.literal("Identifiable"),
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
  _type: z.literal("News"),
  readLink: z.string().url(),
  queryContext: z.object({
    _type: z.literal("QueryContext"),
    originalQuery: z.string(),
    adultIntent: z.boolean(),
  }),
  totalEstimatedMatches: z.number(),
  sort: z.array(
    z.object({
      _type: z.literal("SortValue"),
      name: z.string(),
      id: z.string(),
      isSelected: z.boolean(),
      url: z.string().url(),
    })
  ),
  value: z.array(
    z.object({
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
      about: z
        .array(
          z.object({
            _type: z.literal("Thing"),
            readLink: z.string().url(),
            name: z.string(),
          })
        )
        .optional(),
      mentions: z
        .array(
          z.object({
            _type: z.literal("Thing"),
            name: z.string(),
          })
        )
        .optional(),
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
      category: z.string().optional(),
    })
  ),
})
