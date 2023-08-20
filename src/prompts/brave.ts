import { SearchResponseSchema } from "@/schema/brave"
// import { createStructuredOutputChainFromZod } from "langchain/chains/openai_functions"
import { OpenAI } from "langchain/llms/openai"
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts"
import { z } from "zod"

// const SummarizeResponseSchema = z.object({
//   topics: z
//     .object({
//       title: z.string().describe("A title for the idea or topic."),
//       description: z
//         .string()
//         .describe("A one sentence description of the idea or topic."),
//       sources: z
//         .object({
//           name: z.string().describe("The name of the website or news article."),
//           url: z
//             .string()
//             .url()
//             .describe("The url of the website or news article."),
//         })
//         .array()
//         .describe(
//           "A list of up to 3 unique urls that are relevant to the idea or topic."
//         ),
//     })
//     .array()
//     .describe(
//       "A list of the 3 top unique ideas or topics discussed in the search results."
//     ),
// })

export async function summarize(
  query: string,
  results: z.infer<typeof SearchResponseSchema>
) {
  const prompt = new ChatPromptTemplate({
    promptMessages: [
      SystemMessagePromptTemplate.fromTemplate(
        `Summarize the relevance of the provided search query and results.
            Notes:
            - Do not include unicode characters in your response.
            - Do not include redundant information in your response.
        `
      ),
      HumanMessagePromptTemplate.fromTemplate("{request}"),
    ],
    inputVariables: ["request"],
  })

  const llm = new OpenAI({
    modelName: "gpt-3.5-turbo-16k",
    temperature: 0,
  })

  // const chain = createStructuredOutputChainFromZod(SummarizeResponseSchema, {
  //   prompt,
  //   llm,
  // })

  // const result = await chain
  //   .call({
  //     request: JSON.stringify({
  //       query,
  //       results: {
  //         web: results.web?.results.map((result) => ({
  //           title: result.title,
  //           url: result.url,
  //           description: result.description,
  //         })),
  //         news: results.news?.results.map((result) => ({
  //           title: result.title,
  //           url: result.url,
  //           description: result.description,
  //         })),
  //       },
  //     }),
  //   })
  //   .catch((e) => {
  //     console.error(e.message)
  //     throw "Error fetching summary."
  //   })

  // return SummarizeResponseSchema.parse(result.output)

  return llm.call(
    await prompt.format({
      request: JSON.stringify({
        query,
        results: {
          web: results.web?.results.map((result) => ({
            title: result.title,
            url: result.url,
            description: result.description,
          })),
          news: results.news?.results.map((result) => ({
            title: result.title,
            url: result.url,
            description: result.description,
          })),
        },
      }),
    })
  )
}
