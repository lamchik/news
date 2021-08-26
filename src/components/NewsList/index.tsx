import Grid from "@material-ui/core/Grid";
import {NewsCard} from '../NewsCard'
import {useSelector} from "react-redux";
import {State} from "../../store/reducer";
import { News } from '../../domain/news'


export function NewsList() {
  const allNews = useSelector<State, News[]>((state) => state.allNews)

  return (
    <Grid container spacing={3} >
      {allNews.map(single => (
        <Grid key={single.id} item xs={3}>
          <NewsCard news={single} />
        </Grid>
      ))}
    </Grid>
  );
}
