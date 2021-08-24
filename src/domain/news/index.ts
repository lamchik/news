export type News = {
  id: number
  title: string
  score: number
  by: string
  time: Date
}

export type APINews = {
  id: number
  title: string
  score: number
  by: string
  time: number
}

export const apiNewsToNews = (news: APINews): News => {
  return {
    ...news,
    time: new Date(news.time)
  }
}