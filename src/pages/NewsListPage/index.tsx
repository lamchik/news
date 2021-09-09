import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import { Action } from "../../store/news";
import { loadNews } from "../../api/news";
import { NewsList } from "../../components/NewsList";
import Button from "@material-ui/core/Button";
import { useStyles } from "./styles";

export const NewsListPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const dispatchAction = useCallback(
    (action: Action) => {
      dispatch(action);
    },
    [dispatch]
  );

  const loadNewsToState = useCallback(() => {
    loadNews()
      .then((news) => {
        dispatchAction({ type: "NewsLoaded", value: news });
      })
      .catch((err) => {
        dispatchAction({ type: "FailedToLoadNews", value: err.toString() });
      });
  }, [dispatchAction]);

  const getNews = useCallback(() => {
    dispatchAction({ type: "NewsLoading" });
    loadNewsToState();
  }, [dispatchAction, loadNewsToState]);

  useEffect(() => {
    getNews();
    let timerId = setInterval(loadNewsToState, 60000);
    return () => {
      clearInterval(timerId);
    };
  }, [getNews, loadNewsToState]);

  return (
    <>
      <div className={classes.titleButtonWrap}>
        <Typography className={classes.header}>Hacker News</Typography>
        <Button className={classes.button} variant="outlined" onClick={getNews}>
          Update
        </Button>
      </div>
      <NewsList />
    </>
  );
};
