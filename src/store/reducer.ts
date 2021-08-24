import { News } from '../domain/news'

export type DataState = "idle" | "loading" | "loaded" | "failed"

export type State = {
  allNews: News[],
  dataState: DataState,
  error?: string
}

type ActionNewsLoaded = {
  type: "NewsLoaded"
  value: News[]
}

type ActionFailedToLoadNews = {
  type: "FailedToLoadNews"
  value: string
}

type ActionNewsLoading = {
  type: "NewsLoading"
}

export type Action = ActionNewsLoaded | ActionFailedToLoadNews | ActionNewsLoading

const initialState: State = {
  allNews: [],
  dataState: "idle",
}

export const newsReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "NewsLoading": return {...state, dataState: "loading"}
    case "NewsLoaded": return {...state, dataState: "loaded", allNews: action.value}
    case "FailedToLoadNews": return {...state, dataState: "failed", error: action.value}
    default: return state
  }
}