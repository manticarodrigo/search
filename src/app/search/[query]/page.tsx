import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { search } from "@/lib/brave"
import { summarize } from "@/prompts/summarize"
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
import { ScrollShadow } from "@/components/ui/scroll-shadow"

type Props = {
  params: Record<string, string>
}

export default async function SearchPage({ params }: Props) {
  const query = decodeURIComponent(params.query)
  const results = await search(query ?? "")
  const summary = await summarize(query ?? "", results)

  return (
    <>
      <section className="container space-y-4 py-12">
        <h2 className="text-2xl font-bold">Brief</h2>
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <Card className="flex flex-col gap-4">
            <CardHeader className="flex flex-col gap-2">
              <CardTitle>{summary.title}</CardTitle>
              <ul className="flex flex-wrap gap-2">
                {summary.keywords.map((keyword) => (
                  <li key={keyword}>
                    <Badge>{keyword}</Badge>
                  </li>
                ))}
              </ul>
            </CardHeader>
            <CardContent className="h-full min-h-0">
              {summary.content}
            </CardContent>
          </Card>
          <div className="">
            <ul className="flex flex-wrap gap-4">
              {summary.topics.map((topic, idx) => (
                <li key={`${topic.title}-${idx}`}>
                  <div className="text-base font-bold">{topic.title}</div>
                  <div className="text-sm">{topic.description}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {results.news && (
        <section>
          <div className="container space-y-4 py-6">
            <h2 className="text-2xl font-bold">News</h2>
          </div>
          <ScrollShadow orientation="horizontal" className="border-y">
            <ul className="container flex items-stretch gap-4 py-6">
              {results.news?.results.map((article) => (
                <li key={article.url}>
                  <Card className="flex	h-full w-72 flex-col">
                    <CardHeader>
                      <CardTitle className="text-base">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {article.age}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-full min-h-0 text-sm">
                      {article.description}
                    </CardContent>
                    <CardFooter>
                      <Button
                        asChild
                        variant="link"
                        className="ml-auto text-sm"
                      >
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
        </section>
      )}

      {results.web && (
        <section className="container space-y-4 py-6">
          <h2 className="text-2xl font-bold">Web</h2>
          <ul className="flex flex-col gap-4">
            {results.web?.results.map((page) => (
              <li key={page.url}>
                <Link href={page.url} className="text-base font-bold">
                  {page.title}
                </Link>
                <p className="text-xs italic">{page.age}</p>
                <p className="text-sm text-muted-foreground">
                  {page.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
