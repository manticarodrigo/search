import {
  EntitiesResponseSchema,
  NewsArticleResponseSchema,
  SearchResponseSchema,
} from "@/schema/bing"
import { createStructuredOutputChainFromZod } from "langchain/chains/openai_functions"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { PromptTemplate } from "langchain/prompts"
import { z } from "zod"

const SummarizeResponseSchema = z.object({
  topics: z
    .object({
      title: z.string().describe("A title for the idea or topic."),
      description: z
        .string()
        .describe("A one sentence description of the idea or topic."),
      sources: z
        .object({
          name: z.string().describe("The name of the website or news article."),
          url: z
            .string()
            .url()
            .describe("The url of the website or news article."),
        })
        .array()
        .describe(
          "A list of up to 3 unique urls that are relevant to the idea or topic."
        ),
    })
    .array()
    .describe(
      "A list of the 3 top unique ideas or topics discussed in the search results."
    ),
})

export async function summarizeResults(
  query: string,
  entities: z.infer<typeof EntitiesResponseSchema>,
  news: z.infer<typeof NewsArticleResponseSchema>,
  search: z.infer<typeof SearchResponseSchema>
) {
  const prompt = new PromptTemplate({
    inputVariables: ["query", "results"],
    template: `
        You are analyzing web and news search results for the query: {query}
        Evaluate the relevance of the following search results: {results}

        Notes:
            - Do not include unicode characters in your response.
            - Do not include redundant information in your response.
    `,
  })

  const llm = new ChatOpenAI({
    modelName: "gpt-3.5-turbo-16k",
    temperature: 0,
  })

  const chain = createStructuredOutputChainFromZod(SummarizeResponseSchema, {
    prompt,
    llm,
  })

  const result = await chain
    .call({
      query,
      results: JSON.stringify({
        entities: entities.entities?.value.map((e) => ({
          name: e.name,
          description: e.description,
          url: e.url,
        })),
        news: news.value.map((a) => ({
          name: a.name,
          description: a.description,
          url: a.url,
        })),
        search: search.webPages.value.map((s) => ({
          name: s.name,
          description: s.snippet,
          url: s.url,
        })),
      }),
    })
    .catch((e) => {
      console.error(e.message)
      throw "Error fetching summary."
    })

  return SummarizeResponseSchema.parse(result.output)
}
