export type News = {
  id: number;
  title: string;
  score: number;
  by: string;
  time: Date;
  kids?: number[];
  url?: string;
};

export type APINews = {
  id: number;
  title: string;
  score: number;
  by: string;
  time: number;
  kids?: number[];
  url?: string;
};

export type Comment = {
  id: number;
  text: string;
  by: string;
  time: number;
  kids?: number[];
  parent?: number[];
};

export const apiNewsToNews = (news: APINews): News => {
  const date = new Date(1970, 0, 1);
  date.setSeconds(news.time);
  return {
    ...news,
    time: date,
  };
};
