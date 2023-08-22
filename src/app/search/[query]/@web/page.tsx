import { search } from "@/lib/brave"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

type Props = {
  params: Record<string, string>
}

export default async function SearchWebPage({ params }: Props) {
  const query = decodeURIComponent(params.query)
  const results = await search(query ?? "")

  if (!results.web) {
    return null
  }

  return (
    <section className="container space-y-4 py-12">
      <h2 className="text-2xl font-bold">Web</h2>
      <ul className="flex max-w-2xl flex-col gap-6">
        {results.web?.results.map((page) => (
          <li key={page.url}>
            <div className="flex items-center gap-2">
              <Avatar className="h-4 w-4 bg-muted-foreground">
                <AvatarImage
                  src={page.meta_url.favicon}
                  alt={`Icon for ${page.meta_url.netloc}`}
                />
                <AvatarFallback className="bg-muted-foreground" />
              </Avatar>
              <div className="text-base font-medium">
                {page.meta_url.netloc}
              </div>
            </div>
            <Button variant="link" asChild className="p-0">
              <a
                href={page.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-bold"
              >
                {page.title}
              </a>
            </Button>
            <p
              className="text-sm text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: page.description }}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
