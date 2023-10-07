import { NextResponse } from "next/server"
import { dailyTrends } from "google-trends-api"
import { DailyTrendResponseSchema } from "@/schema/trends"

export async function fetchDailyTrends() {
  const trends = await new Promise((resolve, reject) => {
    dailyTrends({ geo: "US" }, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(res))
      }
    })
  })

  return DailyTrendResponseSchema.parse(trends)
}

export async function GET() {
  const trends = await fetchDailyTrends()
  return NextResponse.json(trends)
}
