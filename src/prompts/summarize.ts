import { SearchResponseSchema } from "@/schema/brave"
import { OpenAI } from "openai"
import { z } from "zod"
import zodToJsonSchema from "zod-to-json-schema"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

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
      "A list of the top 3 unique ideas or topics discussed in the search results."
    ),
})

export async function summarize(
  query: string,
  results: z.infer<typeof SearchResponseSchema>
) {
  const payload = {
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
  }

  const prompt = `
    Summarize the relevance of the provided search query and results.
    ${JSON.stringify(payload)}
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

  const structuredResponse = JSON.parse(
    response.choices[0].message!.function_call!.arguments!
  )
  return SummarizeResponseSchema.parse(structuredResponse)
}
