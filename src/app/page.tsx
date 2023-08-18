import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { fetchNews, fetchTopics } from "@/lib/bing"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Highlighter } from "@/components/ui/highlighter"
import { Header } from "@/components/nav/header"

export default async function Home() {
  const topics = await fetchTopics()
  const articles = await fetchNews()

  return (
    <main className="flex min-h-full flex-col items-center justify-center">
      <Header />
      <section className="container space-y-4 py-6">
        <h2 className="text-xl font-light">Topics</h2>
        <ul className="flex flex-wrap gap-2">
          {topics.map((topic, idx) => (
            <Badge variant="secondary" key={`${topic.name}-${idx}`}>
              {topic.name}
            </Badge>
          ))}
        </ul>
        <h2 className="text-xl font-light">News</h2>
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
                <CardTitle>
                  <Highlighter>{article.name}</Highlighter>
                </CardTitle>
                <CardDescription>
                  {article.provider.map((provider) => provider.name).join(", ")}{" "}
                  -{" "}
                  {new Date(article.datePublished).toLocaleDateString("en-US")}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-full min-h-0">
                <Highlighter>{article.description}</Highlighter>
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
