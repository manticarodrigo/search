import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const NewsArticleSchema = z.object({
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
      isLicensed: z.boolean(),
    })
    .optional(),
  description: z.string(),
  provider: z.array(
    z.object({
      _type: z.literal("Organization"),
      name: z.string(),
      image: z.object({
        _type: z.literal("ImageObject"),
        thumbnail: z.object({
          _type: z.literal("ImageObject"),
          contentUrl: z.string().url(),
        }),
      }),
    })
  ),
  datePublished: z.string().pipe(z.coerce.date()),
})

export default async function Home() {
  const url =
    "https://bing-news-search1.p.rapidapi.com/news?safeSearch=Off&textFormat=Raw"
  const options = {
    method: "GET",
    headers: {
      "X-BingApis-SDK": "true",
      "X-RapidAPI-Key": process.env.RAPIDAPI_API_KEY ?? "",
      "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
    },
  }

  const response = await fetch(url, options)
  const result = await response.text()
  const articles = NewsArticleSchema.array().parse(JSON.parse(result).value)

  return (
    <main className="flex min-h-full flex-col items-center justify-center">
      <header className="w-full border-b p-2">
        <h1 className="text-lg font-light">Synopsis</h1>
      </header>
      <section className="container py-6">
        <ul className="grid grid-cols-4 gap-4">
          {articles.map((article) => (
            <Card key={article.url} className="flex flex-col">
              <CardHeader>
                <div className="pb-4">
                  {article.image ? (
                    <Image
                      src={article.image.thumbnail.contentUrl}
                      alt={article.name}
                      width={article.image.thumbnail.width}
                      height={article.image.thumbnail.height}
                      className="h-32 w-full object-cover"
                    />
                  ) : (
                    <div className="h-32 w-full bg-gray-200" />
                  )}
                </div>
                <CardTitle>{article.name}</CardTitle>
                <CardDescription>
                  {article.provider.map((provider) => provider.name).join(", ")}{" "}
                  -{" "}
                  {new Date(article.datePublished).toLocaleDateString("en-US")}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-full min-h-0">
                {article.description}
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="ml-auto">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    Read more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </ul>
      </section>
    </main>
  )
}
