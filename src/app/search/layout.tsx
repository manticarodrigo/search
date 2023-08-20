import { Header } from "@/components/nav/header"
import { SearchDialog } from "@/components/search-dialog"

export default async function SearchLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <main className="flex min-h-full flex-col">
      <Header>
        <SearchDialog />
      </Header>
      {children}
    </main>
  )
}
