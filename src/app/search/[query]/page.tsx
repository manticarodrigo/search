import { ArrowRight } from "lucide-react"

import { search } from "@/lib/brave"
import { summarize } from "@/prompts/summarize"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Props = {
  params: Record<string, string>
}

export default async function SearchPage({ params }: Props) {
  const query = decodeURIComponent(params.query)
  const results = await search(query ?? "")
  const summary = await summarize(query ?? "", results)

  return (
    <>
      <section className="container space-y-4 py-6">
        <h2 className="text-2xl font-bold">Summary</h2>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {summary.topics.map((topic, idx) => (
            <li key={`${topic.title}-${idx}`} className="h-full">
              <Card className="flex h-full flex-col">
                <CardHeader>
                  <CardTitle>{topic.title}</CardTitle>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
                <CardContent className="h-full min-h-0">
                  <ul>
                    {topic.sources.map((source, idx) => (
                      <li key={`${source.url}-${idx}`}>
                        <Button asChild variant="link">
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm"
                          >
                            <ArrowRight className="mr-2 h-4 w-4" />
                            {source.name}
                          </a>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      {results.news && (
        <section className="container space-y-4 py-6">
          <h2 className="text-2xl font-bold">News</h2>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {results.news?.results.map((article) => (
              <li key={article.url} className="h-full">
                <Card className="flex h-full flex-col">
                  <CardHeader>
                    <CardTitle>{article.title}</CardTitle>
                    <CardDescription>{article.age}</CardDescription>
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
              </li>
            ))}
          </ul>
        </section>
      )}

      {results.web && (
        <section className="container space-y-4 py-6">
          <h2 className="text-2xl font-bold">Web</h2>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {results.web?.results.map((page) => (
              <li key={page.url} className="h-full">
                <Card className="flex h-full flex-col">
                  <CardHeader>
                    <CardTitle>{page.title}</CardTitle>
                    <CardDescription>{page.age}</CardDescription>
                  </CardHeader>
                  <CardContent className="h-full min-h-0">
                    {page.description}
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="link" className="ml-auto">
                      <a
                        href={page.url}
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
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
