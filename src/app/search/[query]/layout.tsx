import { Header } from "@/components/nav/header"
import { SearchDialog } from "@/components/search-dialog"

type Props = {
  children: React.ReactNode
  news: React.ReactNode
  web: React.ReactNode
}

export async function generateMetadata({
  params,
}: {
  params: Record<string, string>
}) {
  return {
    title: `Synopsis Search - ${params.query}`,
  }
}

export default async function SearchPageLayout({ children, news, web }: Props) {
  return (
    <main className="flex min-h-full flex-col">
      <Header>
        <SearchDialog />
      </Header>
      {children}
      {news}
      {web}
    </main>
  )
}
