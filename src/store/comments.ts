import { Comment } from "../domain/comments";
import { DataState } from "../api";

export type State = {
  commentsByNewsIds: Record<string, Comment[]>;
  dataState: DataState;
  error?: string;
};

type ActionCommentsLoaded = {
  type: "CommentsLoaded";
  value: {
    comments: Comment[];
    newsId: string;
  };
};

type ActionFailedToLoadComments = {
  type: "FailedToLoadComments";
  value: string;
};

type ActionCommentsLoading = {
  type: "CommentsLoading";
};

export type Action =
  | ActionCommentsLoaded
  | ActionFailedToLoadComments
  | ActionCommentsLoading;

const initialState: State = {
  commentsByNewsIds: {},
  dataState: "idle",
};

export const commentsReducer = (
  state: State = initialState,
  action: Action
): State => {
  switch (action.type) {
    case "CommentsLoading":
      return { ...state, dataState: "loading" };
    case "CommentsLoaded":
      return {
        ...state,
        dataState: "loaded",
        commentsByNewsIds: {
          ...state.commentsByNewsIds,
          [action.value.newsId]: action.value.comments,
        },
      };
    case "FailedToLoadComments":
      return { ...state, dataState: "failed", error: action.value };
    default:
      return state;
  }
};
