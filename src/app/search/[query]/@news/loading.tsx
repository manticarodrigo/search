import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SearchNewsPageLoader() {
  return (
    <section>
      <div className="container space-y-4 py-6">
        <h2 className="text-2xl font-bold">News</h2>
      </div>
      <ul className="container flex items-stretch gap-4 py-6">
        {Array.from({ length: 3 }).map((_, idx) => (
          <li key={idx}>
            <Card className="flex	h-full w-72 flex-col">
              <CardHeader>
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </CardHeader>
              <CardContent className="h-full min-h-0 text-sm">
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
