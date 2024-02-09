import { Balancer } from "react-wrap-balancer"

import { Header } from "@/components/nav/header"
import { SearchForm } from "@/components/search"

export default function RootLoader() {
  return (
    <main className="flex min-h-full flex-col">
      <Header />
      <section className="container flex flex-col items-center justify-center gap-8 px-4 py-8 md:pt-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
            Get smart on any topic.
          </h1>
          <Balancer className="max-w-2xl text-center text-lg text-muted-foreground sm:text-xl">
            AI-powered search aggregator empowering intelligent discovery.
          </Balancer>
        </div>
        <div className="w-full max-w-2xl rounded-lg border shadow-md">
          <SearchForm />
        </div>
      </section>
    </main>
  )
}
