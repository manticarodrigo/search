import { Skeleton } from "@/components/ui/skeleton"

export default function SearchPageLoader() {
  return (
    <section className="container space-y-4 py-12">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-4 w-1/4" />
    </section>
  )
}
