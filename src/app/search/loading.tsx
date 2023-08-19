import { Skeleton } from "@/components/ui/skeleton"
import { Header } from "@/components/nav/header"

export default function SearchPageLoader() {
  return (
    <main className="flex min-h-full flex-col">
      <Header />
      <section className="container space-y-4 py-6">
        <Skeleton className="h-12 w-full max-w-2xl" />
      </section>
    </main>
  )
}
