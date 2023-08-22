import { ArrowRight } from "lucide-react"

import { search } from "@/lib/brave"
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

export default async function SearchNewsPage({ params }: Props) {
  const query = decodeURIComponent(params.query)
  const results = await search(query ?? "")

  if (!results.news) {
    return null
  }

  return (
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
    </section>
  )
}
