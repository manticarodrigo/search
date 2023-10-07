declare module "google-trends-api" {
  interface Options {
    geo: string
  }
  export function dailyTrends(
    options: Options,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (err: any, results: any) => void
  ): void
  export function realTimeTrends(
    options: Options,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (err: any, results: any) => void
  ): void
}
