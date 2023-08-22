import { Skeleton } from "@/components/ui/skeleton"

export default function SearchWebPageLoader() {
  return (
    <section className="container space-y-4 py-12">
      <h2 className="text-2xl font-bold">Web</h2>
      <ul className="flex flex-col gap-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <li key={idx} className="flex flex-col gap-2">
            <Skeleton className="h-4 w-72" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-96" />
          </li>
        ))}
      </ul>
    </section>
  )
}
