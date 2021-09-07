import { News } from "../domain/news";

export type DataState = "idle" | "loading" | "loaded" | "failed";

export type State = {
  allNews: Record<string, News>;
  dataState: DataState;
  error?: string;
};

type ActionNewsLoaded = {
  type: "NewsLoaded";
  value: News[];
};

type ActionFailedToLoadNews = {
  type: "FailedToLoadNews";
  value: string;
};

type ActionNewsLoading = {
  type: "NewsLoading";
};

export type Action =
  | ActionNewsLoaded
  | ActionFailedToLoadNews
  | ActionNewsLoading;

const initialState: State = {
  allNews: {},
  dataState: "idle",
};

const mapNewsArrayToObj = (arr: News[]): Record<string, News> => {
  const res: Record<string, News> = {};
  for (let i = 0; i < arr.length; i++) {
    res[arr[i].id.toString()] = arr[i];
  }
  return res;
};

export const newsReducer = (
  state: State = initialState,
  action: Action
): State => {
  switch (action.type) {
    case "NewsLoading":
      return { ...state, dataState: "loading" };
    case "NewsLoaded":
      return {
        ...state,
        dataState: "loaded",
        allNews: mapNewsArrayToObj(action.value),
      };
    case "FailedToLoadNews":
      return { ...state, dataState: "failed", error: action.value };
    default:
      return state;
  }
};
