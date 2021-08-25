import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Container } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NewsList } from './components/NewsList'
import {State, DataState, Action} from './store/reducer'
import {APINews, apiNewsToNews} from "./domain/news";
import { styled } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

const MainContainer = styled(Container)({
  backgroundColor: '#1e2229'
});

function App() {
  const dataState = useSelector<State, DataState>((state) => state.dataState)
  const error = useSelector<State, string | undefined>((state) => state.error)
  const dispatch = useDispatch()

  const dispatchAction = (action: Action) => {
    dispatch(action)
  }

  useEffect(() => {
    fetch("https://hacker-news.firebaseio.com/v0/newstories.json", {
      method: "GET"
    }).then(res => {
      return res.json()
    }).then((newsIds: number[]) => {
      const firstNewsIds = newsIds.slice(0, 100)
      const promiseArray = firstNewsIds.map(newsId => fetch(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json`, {method:"GET"}))
      return Promise.all(promiseArray)
    }).then(allFetchResults => {
      return Promise.all(allFetchResults.map(fetchResult => fetchResult.json()))
    }).then((apiNews: APINews[]) => {
      const news = apiNews.map(news => apiNewsToNews(news))
      dispatchAction({type: "NewsLoaded", value: news})
    }).catch(err => {
      console.log("HERE", err)
      dispatchAction({type: "FailedToLoadNews", value: err.toString()})
    })
  },[])

  return (
    <MainContainer maxWidth="xl">
      {(dataState === "failed" && <p>{error}</p>)}
      {(dataState === "idle" || dataState === "loading") && <CircularProgress />}
      {dataState === "loaded" &&
        <NewsList />
      }
    </MainContainer>
  );
}

export default App;
