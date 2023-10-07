import { NextResponse } from "next/server"
import { realTimeTrends } from "google-trends-api"
import { RealtimeTrendResponseSchema } from "@/schema/trends"
import { z } from "zod"

export const runtime = "nodejs"

export async function fetchRealtimeTrends(): Promise<
  z.infer<typeof RealtimeTrendResponseSchema>
> {
  return await new Promise((resolve, reject) => {
    realTimeTrends({ geo: "US" }, (err, res) => {
      if (err) {
        reject(err)
      } else {
        const parsed = RealtimeTrendResponseSchema.parse(JSON.parse(res))
        resolve(parsed)
      }
    })
  })
}

export async function GET() {
  const topics = await fetchRealtimeTrends()
  return NextResponse.json(topics)
}
