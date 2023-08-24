import Balancer from "react-wrap-balancer"

import { fetchTopics } from "@/lib/bing"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/nav/header"
import { SearchForm } from "@/components/search"

export default async function RootPage() {
  const topics = await fetchTopics()

  return (
    <main className="flex min-h-full flex-col">
      <Header />
      <section className="container flex flex-col items-center justify-center gap-8 px-4 py-8 md:pt-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
            Get smart on any topic.
          </h1>
          <Balancer className="mx-auto max-w-2xl text-center text-lg text-muted-foreground sm:text-xl">
            Synopsis is an AI-powered search aggregator empowering intelligent
            discovery.
          </Balancer>
        </div>
        <div className="w-full max-w-2xl rounded-lg border shadow-md">
          <SearchForm />
        </div>
        {topics.value && (
          <ul className="flex flex-wrap justify-center gap-2 px-4">
            {topics.value?.map((topic, idx) => (
              <Badge variant="secondary" key={`${topic.name}-${idx}`}>
                {topic.name}
              </Badge>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
