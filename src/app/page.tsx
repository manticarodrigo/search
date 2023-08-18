import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-full flex-col items-center justify-center">
      Hello world!
      <Button>
        <Plus />
        Get started
      </Button>
    </main>
  )
}
