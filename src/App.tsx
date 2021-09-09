import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { NewsList } from "./components/NewsList";
import { State, DataState, Action } from "./store/reducer";
import { APINews, apiNewsToNews } from "./domain/news";
import { makeStyles, styled } from "@material-ui/core/styles";
import { BrowserRouter, Route } from "react-router-dom";
import { NewsPage } from "./components/NewsPage";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  titleButtonWrap: {
    display: "flex",
  },
  header: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#fafafa",
    margin: "0 30px 30px 0",
  },

  container: {
    backgroundColor: "#1e1f25",
    minHeight: "100vh",
    padding: "30px",
  },

  button: {
    width: "70px",
    height: "35px",
    borderColor: "#d1d1d1",
    color: "#d1d1d1",
    marginTop: "7px",
  },
});

function App() {
  const dataState = useSelector<State, DataState>((state) => state.dataState);
  const error = useSelector<State, string | undefined>((state) => state.error);
  const dispatch = useDispatch();
  const classes = useStyles();

  const dispatchAction = (action: Action) => {
    dispatch(action);
  };

  function getNews() {
    dispatchAction({ type: "NewsLoading" });
    fetch("https://hacker-news.firebaseio.com/v0/newstories.json", {
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
        const news = apiNews.map((news) => apiNewsToNews(news));
        dispatchAction({ type: "NewsLoaded", value: news });
      })
      .catch((err) => {
        dispatchAction({ type: "FailedToLoadNews", value: err.toString() });
      });
  }

  function getNewsForAutomaticUpdating() {
    fetch("https://hacker-news.firebaseio.com/v0/newstories.json", {
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
        const news = apiNews.map((news) => apiNewsToNews(news));
        dispatchAction({ type: "NewsLoaded", value: news });
      })
      .catch((err) => {
        dispatchAction({ type: "FailedToLoadNews", value: err.toString() });
      });
    console.log("MEOW");
  }

  useEffect(() => {
    getNews();
    setInterval(getNewsForAutomaticUpdating, 60000);
    let timerId = setInterval(() => getNewsForAutomaticUpdating(), 60000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <BrowserRouter>
      <Container className={classes.container} maxWidth="xl">
        <Route exact path="/">
          <div className={classes.titleButtonWrap}>
            <Typography className={classes.header}>Hacker News</Typography>
            <Button
              className={classes.button}
              variant="outlined"
              onClick={getNews}
            >
              Update
            </Button>
          </div>
          {dataState === "failed" && <p>{error}</p>}
          {(dataState === "idle" || dataState === "loading") && (
            <CircularProgress />
          )}
          {dataState === "loaded" && <NewsList />}
        </Route>
        <Route path="/news/:id">
          <NewsPage />
        </Route>
      </Container>
    </BrowserRouter>
  );
}

export default App;
