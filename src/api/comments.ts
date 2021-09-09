import { APINews, apiNewsToNews, News } from "../domain/news";
import { Comment } from "../domain/comments";

function getCommentsByIds(kids: number[]): Promise<Comment[]> {
  const arrayOfKids = kids.map((kid) =>
    fetch(`https://hacker-news.firebaseio.com/v0/item/${kid}.json`, {
      method: "GET",
    })
  );
  return Promise.all(arrayOfKids)
    .then((allResults) => {
      return Promise.all(allResults.map((result) => result.json()));
    })
    .then((res: Comment[]) => {
      let allKidsIds: number[] = [];
      res.forEach((item) => {
        allKidsIds = allKidsIds.concat(item.kids || []);
      });
      if (allKidsIds.length === 0) {
        return res;
      }
      return getCommentsByIds(allKidsIds).then((children) => {
        return children.concat(res);
      });
    });
}

type CommentsOutput = {
  post: News;
  comments: Comment[];
};

export const loadComments = (postId: string): Promise<CommentsOutput> => {
  let news: News;
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${postId}.json`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((res: APINews) => {
      news = apiNewsToNews(res);
      if (!res.kids) {
        return [];
      }
      return getCommentsByIds(res.kids);
    })
    .then((comments) => {
      return { post: news, comments: comments };
    });
};
