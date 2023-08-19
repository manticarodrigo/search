import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { fetchEntities, fetchNews, fetchSearch } from "@/lib/bing"
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

  return (
    <main className="flex min-h-full flex-col">
      <Header>
        <SearchDialog query={searchParams.query} />
      </Header>

      {entities.length > 0 && (
        <section className="container space-y-4 py-6">
          <h2 className="text-2xl font-bold">Entities</h2>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {entities.map((entity) => (
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
                    {entity.entityPresentationInfo.entityTypeHints && (
                      <ul className="flex flex-wrap gap-2">
                        {entity.entityPresentationInfo.entityTypeHints.map(
                          (subtype) => (
                            <Badge key={subtype}>{subtype}</Badge>
                          )
                        )}
                      </ul>
                    )}
                  </CardDescription>
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

      {articles.length > 0 && (
        <section className="container space-y-4 py-6">
          <h2 className="text-2xl font-bold">News</h2>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {articles.map((article) => (
              <Card key={article.url} className="flex flex-col">
                <CardHeader>
                  <CardTitle>
                    <Highlighter>{article.name}</Highlighter>
                  </CardTitle>
                  <CardDescription>
                    {article.provider
                      .map((provider) => provider.name)
                      .join(", ")}{" "}
                    -{" "}
                    {new Date(article.datePublished).toLocaleDateString(
                      "en-US"
                    )}
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

      {search.value.length > 0 && (
        <section className="container space-y-4 py-6">
          <h2 className="text-2xl font-bold">Web</h2>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {search.value.map((article) => (
              <Card key={article.url} className="flex flex-col">
                <CardHeader>
                  <CardTitle>
                    <Highlighter>{article.name}</Highlighter>
                  </CardTitle>
                  <CardDescription>
                    {article.about?.map((about) => about.name).join(", ")} -{" "}
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
