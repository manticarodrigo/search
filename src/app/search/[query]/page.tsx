import { ArrowRight } from "lucide-react"

import { search } from "@/lib/brave"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollShadow } from "@/components/ui/scroll-shadow"

import { SearchSummary } from "./summary"

type Props = {
  params: Record<string, string>
}

export default async function SearchPage({ params }: Props) {
  const query = decodeURIComponent(params.query)
  const results = await search(query ?? "")

  return (
    <>
      {results.news && (
        <ScrollShadow orientation="horizontal" className="border-y">
          <ul className="container flex items-stretch gap-4 py-6">
            {results.news?.results.map((article) => (
              <li key={article.url}>
                <Card className="flex	h-full w-72 flex-col">
                  <CardHeader>
                    <CardTitle className="text-base">{article.title}</CardTitle>
                    <CardDescription className="text-xs">
                      {article.age}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-full min-h-0 text-sm">
                    {article.description}
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="link" className="ml-auto text-sm">
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
        </ScrollShadow>
      )}
      <div className="container flex flex-col gap-12 py-12 lg:flex-row">
        <aside className="flex w-full flex-col gap-4 lg:order-2">
          <SearchSummary results={results} />
        </aside>
        <div className="shrink-0 lg:order-1">
          {results.web && (
            <ul className="flex max-w-2xl flex-col gap-6">
              {results.web?.results.map((page) => (
                <li key={page.url}>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-4 w-4 bg-muted-foreground">
                      <AvatarImage
                        src={page.meta_url.favicon}
                        alt={`Icon for ${page.meta_url.netloc}`}
                      />
                      <AvatarFallback className="bg-muted-foreground" />
                    </Avatar>
                    <div className="text-base font-medium">
                      {page.meta_url.netloc}
                    </div>
                  </div>
                  <Button variant="link" asChild className="p-0">
                    <a
                      href={page.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-bold"
                    >
                      {page.title}
                    </a>
                  </Button>
                  <p
                    className="text-sm text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: page.description }}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}
