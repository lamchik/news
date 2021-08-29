import {Container} from '@material-ui/core';
import {Card as CardComponent} from '@material-ui/core/';
import { Link, useParams } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import CardContent from '@material-ui/core/CardContent';
import {apiNewsToNews, News} from "../../domain/news";
import CircularProgress from '@material-ui/core/CircularProgress';
import React, {useEffect, useState} from "react";
import {State} from "../../store/reducer";
import {useSelector} from "react-redux";


type Params = {
  id: string;
};
export function NewsPage() {
  const allNews = useSelector<State, Record<string, News>>((state) => state.allNews)
  const [oneNews, setOneNews] = useState<News | undefined>()
  let { id } = useParams<Params>();
  useEffect(() => {
    if( allNews[id]) {
      setOneNews(allNews[id])
      return
    }
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
      method: "GET"
    }).then(res => {
      return res.json()
    }).then(res => {
      const convertedNews = apiNewsToNews(res)
      setOneNews(convertedNews)
    })
   }, [])


  if (!oneNews) {
    return <CircularProgress/>
  }
  return (
    <Container>
      <Link to="/">BACK TO ALL NEWS</Link>
      <CardComponent>
        <CardContent>
          <Typography>{oneNews.time.toDateString()}</Typography>
          <Typography>{oneNews.title}</Typography>
          <div>
            <div>
              <Typography>{oneNews.by}</Typography>
              <Typography>{oneNews.url}</Typography>
            </div>
          </div>
        </CardContent>
      </CardComponent>
    </Container>
  );
}