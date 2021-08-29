export type News = {
  id: number
  title: string
  score: number
  by: string
  time: Date
  commentCount: number
  url: string
}

export type APINews = {
  id: number
  title: string
  score: number
  by: string
  time: number
  commentCount: number
  url: string
}

export const apiNewsToNews = (news: APINews): News => {
  const date =  new Date(1970, 0, 1)
  date.setSeconds(news.time)
  return {
    ...news,
    time: date
  }
}