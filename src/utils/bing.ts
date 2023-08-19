const BingRequest = {
  ENTITIES: "ENTITIES",
  NEWS: "NEWS",
  SEARCH: "SEARCH",
  AUTOSUGGEST: "AUTOSUGGEST",
  TOPICS: "TOPICS",
} as const

const BingUrl = {
  ENTITIES: "https://bing-entity-search.p.rapidapi.com/entities",
  NEWS: "https://bing-news-search1.p.rapidapi.com/news/search",
  SEARCH: "https://bing-web-search1.p.rapidapi.com/search",
  AUTOSUGGEST: "https://bing-autosuggest1.p.rapidapi.com/suggestions",
  TOPICS: "https://bing-news-search1.p.rapidapi.com/news/trendingtopics",
}

const BingHost = {
  ENTITIES: "bing-entity-search.p.rapidapi.com",
  NEWS: "bing-news-search1.p.rapidapi.com",
  SEARCH: "bing-web-search1.p.rapidapi.com",
  AUTOSUGGEST: "bing-autosuggest1.p.rapidapi.com",
  TOPICS: "bing-news-search1.p.rapidapi.com",
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
  const url = makeUrl(BingUrl[type], params)
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-BingApis-SDK": "true",
      "X-RapidAPI-Key": process.env.RAPIDAPI_API_KEY ?? "",
      "X-RapidAPI-Host": BingHost[type],
    },
  })
  const result = await response.text()
  return JSON.parse(result)
}
