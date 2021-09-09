import { combineReducers } from "redux";
import { newsReducer } from "./news";
import { commentsReducer } from "./comments";

export const rootReducer = combineReducers({
  news: newsReducer,
  comments: commentsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
