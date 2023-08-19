const BingRequest = {
  NEWS: "NEWS",
  TOPICS: "TOPICS",
  AUTOSUGGEST: "AUTOSUGGEST",
} as const

const BingUrl = {
  NEWS: "https://bing-news-search1.p.rapidapi.com/news/search",
  TOPICS: "https://bing-news-search1.p.rapidapi.com/news/trendingtopics",
  AUTOSUGGEST: "https://bing-autosuggest1.p.rapidapi.com/suggestions",
}

const BingHost = {
  NEWS: "bing-news-search1.p.rapidapi.com",
  TOPICS: "bing-news-search1.p.rapidapi.com",
  AUTOSUGGEST: "bing-autosuggest1.p.rapidapi.com",
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
  console.log(result)
  return JSON.parse(result)
}
