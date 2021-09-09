import { APINews, apiNewsToNews, News } from "../domain/news";

export const loadNews = (): Promise<News[]> => {
  return fetch("https://hacker-news.firebaseio.com/v0/newstories.json", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((newsIds: number[]) => {
      const firstNewsIds = newsIds.slice(0, 100);
      const promiseArray = firstNewsIds.map((newsId) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json`, {
          method: "GET",
        })
      );
      return Promise.all(promiseArray);
    })
    .then((allFetchResults) => {
      return Promise.all(
        allFetchResults.map((fetchResult) => fetchResult.json())
      );
    })
    .then((apiNews: APINews[]) => {
      return apiNews.map((news) => apiNewsToNews(news));
    });
};
