import {
  EntitiesResponseSchema,
  NewsArticleResponseSchema,
  SearchResponseSchema,
} from "@/schema/bing"
import { createStructuredOutputChainFromZod } from "langchain/chains/openai_functions"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { PromptTemplate } from "langchain/prompts"
import { z } from "zod"

const SummarizeResponseSchema = z
  .object({
    topics: z
      .object({
        title: z.string().describe("A title for the idea or topic."),
        description: z
          .string()
          .describe("A one sentence description of the idea or topic."),
        urls: z
          .object({
            name: z
              .string()
              .describe("The name of the website or news article."),
            url: z
              .string()
              .url()
              .describe("The url of the website or news article."),
          })
          .array()
          .describe(
            "A list of the top 2 or 3 unique urls that are relevant to the idea or topic."
          ),
      })
      .array()
      .describe(
        "A list of the 3 top unique ideas or topics discussed in the search results."
      ),
  })
  .describe(
    "A summary containing 3-4 unique topics found in the search results."
  )

export async function summarizeResults(
  query: string,
  entities: z.infer<typeof EntitiesResponseSchema>,
  news: z.infer<typeof NewsArticleResponseSchema>,
  search: z.infer<typeof SearchResponseSchema>
) {
  const prompt = new PromptTemplate({
    inputVariables: ["query", "entities", "news", "search"],
    template: `
        You are analyzing web and news search results for the query: {query}
        Evaluate the relevance of the following search results:
        Entities: {entities}
        News: {news}
        Search: {search}
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
      entities: JSON.stringify(
        entities.entities?.value.map((e) => ({
          name: e.name,
          description: e.description,
          url: e.url,
        }))
      ),
      news: JSON.stringify(
        news.value.map((a) => ({
          name: a.name,
          description: a.description,
          url: a.url,
        }))
      ),
      search: JSON.stringify(
        search.webPages.value.map((s) => ({
          name: s.name,
          description: s.snippet,
          url: s.url,
        }))
      ),
    })
    .catch((e) => {
      console.error(e.message)
      throw "Error fetching summary."
    })

  return SummarizeResponseSchema.parse(result.output)
}
