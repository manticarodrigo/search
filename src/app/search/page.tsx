import { ArrowRight } from "lucide-react"

import { fetchNews } from "@/lib/bing"
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
  const articles = await fetchNews(searchParams.query ?? "")

  return (
    <main className="flex min-h-full flex-col">
      <Header>
        <SearchDialog query={searchParams.query} />
      </Header>
      <section className="container space-y-4 py-6">
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {articles.map((article) => (
            <Card key={article.url} className="flex flex-col">
              <CardHeader>
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
