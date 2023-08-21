import { OpenAI } from "openai"
import { z } from "zod"
import zodToJsonSchema from "zod-to-json-schema"

import { SearchResponseSchema } from "@/schema/brave"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

const SummarizeResponseSchema = z.object({
  title: z
    .string()
    .describe(
      "Title of the main subject of the search query based on the search results."
    ),
  keywords: z
    .array(z.string())
    .describe("List of up to 3 unique keywords related to the response."),
  content: z
    .string()
    .describe(
      "One-sentence description of the relevance of the main subject to the search query."
    ),
  topics: z
    .object({
      title: z.string().describe("Title of the topic."),
      description: z
        .string()
        .describe("One-sentence description of the topic."),
    })
    .array()
    .describe(
      "List of the top 3 unique ideas or topics discussed in the search results."
    ),
})

export async function summarize(
  query: string,
  results: z.infer<typeof SearchResponseSchema>
) {
  const payload = JSON.stringify({
    query,
    results: {
      web: results.web?.results.map((result) => ({
        title: result.title,
        url: result.url,
        description: result.description,
        extra_snippets: result.extra_snippets,
      })),
      news: results.news?.results.map((result) => ({
        title: result.title,
        url: result.url,
        description: result.description,
      })),
    },
  })

  const prompt = `
    Determine the intent of the provided search query and the best answer from the provided search results:
    ${payload}

    Notes:
      - Do not include language that mentions the search query or results.
      - The output should be a thoughtful summary of the search results that best answers the intent of the search query.
      - Avoid repetition throughout your response and keep it as concise as possible without limiting the completeness of unique and relevant information from the response.

    Set the result to the out function as specified below.
  `

  const response = await openai.chat.completions
    .create({
      model: "gpt-3.5-turbo-16k",
      temperature: 0,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      functions: [
        {
          name: "out",
          description:
            "This is the function that returns the result of the agent",
          parameters: zodToJsonSchema(SummarizeResponseSchema),
        },
      ],
    })
    .catch((e) => {
      throw e.message
    })

  const parsed = JSON.parse(
    response.choices[0].message.function_call?.arguments ?? "{}"
  )

  return SummarizeResponseSchema.parse(parsed)
}
