import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SearchPageLoader() {
  return (
    <section className="container space-y-4 py-6">
      <h2 className="text-2xl font-bold">Brief</h2>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <li key={idx}>
            <Card className="flex flex-col">
              <CardHeader>
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </CardHeader>
              <CardContent className="h-full min-h-[200px]">
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
              <CardFooter>
                <Skeleton className="ml-auto h-4 w-1/4" />
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  )
}
