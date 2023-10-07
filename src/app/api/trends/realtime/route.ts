import { NextResponse } from "next/server"
import { realTimeTrends } from "google-trends-api"

import { RealtimeTrendResponseSchema } from "@/schema/trends"

export async function fetchRealtimeTrends() {
  const trends = await new Promise((resolve, reject) => {
    realTimeTrends({ geo: "US" }, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(res))
      }
    })
  })

  return RealtimeTrendResponseSchema.parse(trends)
}

export async function GET() {
  const topics = await fetchRealtimeTrends()
  return NextResponse.json(topics)
}
