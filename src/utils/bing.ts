const baseUrl = "https://api.bing.microsoft.com/v7.0"

const BingRequest = {
  ENTITIES: "ENTITIES",
  NEWS: "NEWS",
  SEARCH: "SEARCH",
  AUTOSUGGEST: "AUTOSUGGEST",
  TOPICS: "TOPICS",
} as const

const BingUrl = {
  SEARCH: "search",
  NEWS: "news/search",
  TOPICS: "news/trendingtopics",
  ENTITIES: "entities",
  AUTOSUGGEST: "suggestions",
}

type ObjectValues<T> = T[keyof T]

type BingRequestType = ObjectValues<typeof BingRequest>

function makeUrl(baseUrl: string, params: Record<string, string>) {
  const url = new URL(baseUrl)
  url.search = new URLSearchParams({
    ...params,
    mkt: "en-US",
    setLang: "EN",
  }).toString()
  return url.toString()
}

export async function fetchBing(
  type: BingRequestType,
  params: Record<string, string>
) {
  const url = makeUrl(`${baseUrl}/${BingUrl[type]}`, params)
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Ocp-Apim-Subscription-Key": process.env.BING_API_KEY ?? "",
    },
  })
  const result = await response.text()
  return JSON.parse(result)
}
