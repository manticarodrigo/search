import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { fetchEntities, fetchNews, fetchSearch } from "@/lib/bing"
import { summarizeResults } from "@/lib/langchain"
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
import { SearchDialog } from "@/components/search-dialog"

type Props = {
  searchParams: {
    query?: string
  }
}

export default async function SearchPage({ searchParams }: Props) {
  const [entities, articles, search] = await Promise.all([
    fetchEntities(searchParams.query ?? ""),
    fetchNews(searchParams.query ?? ""),
    fetchSearch(searchParams.query ?? ""),
  ])

  const summary = await summarizeResults(
    searchParams.query ?? "",
    entities,
    articles,
    search
  )

  return (
    <main className="flex min-h-full flex-col">
      <Header>
        <SearchDialog query={searchParams.query} />
      </Header>

      <section className="container space-y-4 py-6">
        <h2 className="text-2xl font-bold">Summary</h2>
        <ul className="flex flex-col gap-2">
          {summary.topics.map((topic, idx) => (
            <li key={`${topic.title}-${idx}`}>
              <div className="font-bold">{topic.title}</div>
              <div className="text-sm">{topic.description}</div>
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
            </li>
          ))}
        </ul>
      </section>

      {(entities.entities?.value?.length ?? 0) > 0 && (
        <section className="container space-y-4 py-6">
          <h2 className="text-2xl font-bold">Entities</h2>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {entities.entities?.value.map((entity) => (
              <Card key={entity.url} className="flex flex-col">
                <CardHeader>
                  <CardTitle>
                    {entity.image && (
                      <Image
                        src={entity.image.thumbnailUrl}
                        alt={entity.name}
                        width={entity.image.width}
                        height={entity.image.height}
                      />
                    )}
                    {entity.name}
                  </CardTitle>
                  <CardDescription>
                    {entity.entityPresentationInfo.entityTypeDisplayHint}
                  </CardDescription>
                  {entity.entityPresentationInfo.entityTypeHints && (
                    <ul className="flex flex-wrap gap-2">
                      {entity.entityPresentationInfo.entityTypeHints.map(
                        (subtype) => (
                          <li key={subtype}>
                            <Badge>{subtype}</Badge>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </CardHeader>
                <CardContent className="h-full min-h-0">
                  <Highlighter>{entity.description}</Highlighter>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="link" className="ml-auto">
                    <a
                      href={entity.url}
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
      )}

      {search.webPages.value.length > 0 && (
        <section className="container space-y-4 py-6">
          <h2 className="text-2xl font-bold">Web</h2>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {search.webPages.value.map((page) => (
              <Card key={page.url} className="flex flex-col">
                <CardHeader>
                  <CardTitle>
                    <Highlighter>{page.name}</Highlighter>
                  </CardTitle>
                  <CardDescription>
                    {page.dateLastCrawled.toLocaleDateString("en-US")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-full min-h-0">
                  <Highlighter>{page.snippet}</Highlighter>
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
            ))}
          </ul>
        </section>
      )}

      {articles.value.length > 0 && (
        <section className="container space-y-4 py-6">
          <h2 className="text-2xl font-bold">News</h2>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {articles.value.map((article) => (
              <Card key={article.url} className="flex flex-col">
                <CardHeader>
                  <CardTitle>
                    <Highlighter>{article.name}</Highlighter>
                  </CardTitle>
                  <CardDescription>
                    {article.provider
                      .map((provider) => provider.name)
                      .join(", ")}{" "}
                    - {article.datePublished.toLocaleDateString("en-US")}
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
      )}
    </main>
  )
}
