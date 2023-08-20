import { SearchResponseSchema } from "@/schema/brave"
import { OpenAI } from "openai"
import { z } from "zod"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
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
  Notes:
  - Do not include unicode characters in your response.
  - Do not include redundant information in your response.
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
    })
    .catch((e) => {
      console.error(e.message)
      return "Sorry, I couldn't summarize that."
    })

  if (typeof response === "object") {
    return response.choices[0].message.content
  }
  return response
}
