import { NextResponse } from "next/server"
import trends from "google-trends-api"

export const runtime = "nodejs"

export async function GET() {
  const topics = await new Promise((resolve, reject) => {
    trends.dailyTrends({ geo: "US" }, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(res))
      }
    })
  })

  return NextResponse.json(topics)
}
