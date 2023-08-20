import { SearchResponseSchema } from "@/schema/brave"
import { OpenAI } from "langchain/llms/openai"
import { z } from "zod"

export async function summarize(
  query: string,
  results: z.infer<typeof SearchResponseSchema>
) {
  const llm = new OpenAI({
    modelName: "gpt-3.5-turbo-16k",
    temperature: 0,
  })

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

  const input = `
    Summarize the relevance of the provided search query and results.
    Notes:
    - Do not include unicode characters in your response.
    - Do not include redundant information in your response.
    ${JSON.stringify(payload)}
  `

  return llm.call(input).catch((e) => {
    console.error(e.message)
    return "Sorry, I couldn't summarize that."
  })
}
