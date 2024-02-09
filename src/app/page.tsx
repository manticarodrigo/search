import { dailyTrends } from "google-trends-api"
import Balancer from "react-wrap-balancer"

import { DailyTrendResponseSchema } from "@/schema/trends"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/nav/header"
import { SearchForm } from "@/components/search"

async function fetchDailyTrends() {
  const trends = await new Promise((resolve, reject) => {
    dailyTrends({ geo: "US" }, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(res))
      }
    })
  })

  return DailyTrendResponseSchema.parse(trends)
}

export default async function RootPage() {
  const result = await fetchDailyTrends()

  const trends = result.default.trendingSearchesDays.flatMap((day) =>
    day.trendingSearches.map((trend) => ({
      name: trend.title.query,
    }))
  )

  return (
    <main className="flex min-h-full flex-col">
      <Header />
      <section className="container flex flex-col items-center justify-center gap-8 px-4 py-8 md:pt-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
            Get smart on any topic.
          </h1>
          <Balancer className="mx-auto max-w-2xl text-center text-lg text-muted-foreground sm:text-xl">
            AI-powered search aggregator empowering intelligent discovery.
          </Balancer>
        </div>
        <div className="w-full max-w-2xl rounded-lg border shadow-md">
          <SearchForm />
        </div>
        {trends && (
          <ul className="flex flex-wrap justify-center gap-2 px-4">
            {trends.map((trend, idx) => (
              <Badge variant="secondary" key={`${trend.name}-${idx}`}>
                {trend.name}
              </Badge>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
