import { search } from "@/lib/brave"
import { summarize } from "@/prompts/summarize"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Props = {
  params: Record<string, string>
}

export default async function SearchPage({ params }: Props) {
  const query = decodeURIComponent(params.query)
  const results = await search(query ?? "")
  const summary = await summarize(query ?? "", results)

  return (
    <section className="container space-y-4 py-12">
      <h2 className="text-2xl font-bold">Brief</h2>
      <div className="flex flex-col gap-6 md:flex-row md:items-stretch">
        <Card className="flex flex-col gap-4">
          <CardHeader className="flex flex-col gap-2">
            <CardTitle>{summary.title}</CardTitle>
            <ul className="flex flex-wrap gap-2">
              {summary.keywords.map((keyword) => (
                <li key={keyword}>
                  <Badge className="lowercase">{keyword}</Badge>
                </li>
              ))}
            </ul>
          </CardHeader>
          <CardContent className="h-full min-h-0">
            {summary.content}
          </CardContent>
        </Card>
        <Card className="flex flex-col gap-4">
          <CardHeader className="flex flex-col gap-2">
            <CardTitle>Outline</CardTitle>
          </CardHeader>
          <CardContent className="h-full min-h-0">
            <ul className="flex flex-wrap gap-4">
              {summary.topics.map((topic, idx) => (
                <li key={`${topic.title}-${idx}`}>
                  <div className="text-base font-bold">{topic.title}</div>
                  <div className="text-sm">{topic.description}</div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
