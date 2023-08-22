import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SearchPageLoader() {
  return (
    <section className="container space-y-4 py-12">
      <h2 className="text-2xl font-bold">Brief</h2>
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <Card className="flex w-full flex-col gap-4 sm:w-96">
          <CardHeader className="flex flex-col gap-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </CardHeader>
          <CardContent className="h-full min-h-0">
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
        <div className="">
          <ul className="flex flex-wrap gap-4">
            {Array.from({ length: 8 }).map((_, idx) => (
              <li key={idx}>
                <Skeleton className="h-4 w-3/4" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
