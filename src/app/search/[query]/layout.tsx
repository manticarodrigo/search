import { Header } from "@/components/nav/header"
import { SearchDialog } from "@/components/search-dialog"

type Props = {
  params: Record<string, string>
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props) {
  return {
    title: `Synopsis Search - ${decodeURIComponent(params.query)}`,
  }
}

export default async function SearchPageLayout({ children }: Props) {
  return (
    <main className="flex min-h-full flex-col">
      <Header>
        <SearchDialog />
      </Header>
      {children}
    </main>
  )
}
