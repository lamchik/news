import React, { useEffect, useState } from "react";
import { Card as CardComponent } from "@material-ui/core/";
import { Link, useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { News } from "../../domain/news";
import { loadComments } from "../../api/comments";
import CircularProgress from "@material-ui/core/CircularProgress";
import { RootState } from "../../store";
import { Action } from "../../store/comments";
import { Comments } from "../../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import MaterialUiLink from "@material-ui/core/Link";
import { useStyles } from "./styles";

type Params = {
  id: string;
};

export function NewsPage() {
  const allNews = useSelector<RootState, Record<string, News>>(
    (state) => state.news.allNews
  );
  const [oneNews, setOneNews] = useState<News | undefined>();
  let { id } = useParams<Params>();
  const classes = useStyles();

  const dispatch = useDispatch();
  const dispatchAction = (action: Action) => {
    dispatch(action);
  };

  const loadCommentsToState = () => {
    // fixme: load root comments first and the rest after user opens at least one comment
    loadComments(id)
      .then((output) => {
        dispatchAction({
          type: "CommentsLoaded",
          value: {
            newsId: output.post.id.toString(),
            comments: output.comments,
          },
        });
        setOneNews(output.post);
      })
      .catch((err) => {
        dispatchAction({ type: "FailedToLoadComments", value: err });
        console.log(err);
      });
  };

  const loadCommentsWithLoader = () => {
    dispatchAction({ type: "CommentsLoading" });
    loadCommentsToState();
  };

  useEffect(() => {
    // fixme: dont load whole news if it already in state
    loadCommentsToState();

    let timerId = setInterval(loadCommentsToState, 60000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  if (!oneNews) {
    return <CircularProgress />;
  }

  return (
    <div className={classes.container}>
      <Link className={classes.backLink} to="/">
        <Button className={classes.backButton} variant="outlined">
          Back to all news
        </Button>
      </Link>
      <CardComponent className={classes.card}>
        <CardContent>
          <Typography className={classes.date}>
            {oneNews.time.toDateString()}
          </Typography>
          <Typography className={classes.title}>{oneNews.title}</Typography>
          {oneNews.url && (
            <MaterialUiLink href={oneNews.url} target="_blank" rel="noreferrer">
              {oneNews.url}
            </MaterialUiLink>
          )}
          <div>
            <div>
              <Typography className={classes.author}>{oneNews.by}</Typography>
            </div>
          </div>
        </CardContent>
      </CardComponent>
      <Comments postId={id} updateComments={loadCommentsWithLoader} />
    </div>
  );
}