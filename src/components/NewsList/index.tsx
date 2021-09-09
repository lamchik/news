import Grid from "@material-ui/core/Grid";
import { NewsCard } from "../NewsCard";
import { useSelector } from "react-redux";
import { DataState } from "../../api";
import { RootState } from "../../store";
import { News } from "../../domain/news";
import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

export function NewsList() {
  const allNews = useSelector<RootState, Record<string, News>>(
    (state) => state.news.allNews
  );
  const dataState = useSelector<RootState, DataState>(
    (state) => state.news.dataState
  );
  const error = useSelector<RootState, string | undefined>(
    (state) => state.news.error
  );

  if (dataState === "failed") {
    return <Typography>{error}</Typography>;
  }

  if (dataState === "idle" || dataState === "loading") {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={3}>
      {Object.values(allNews)
        .sort((a, b) => b.time.getTime() - a.time.getTime())
        .map((single) => (
          <Grid key={single.id} item xs={3}>
            <NewsCard news={single} />
          </Grid>
        ))}
    </Grid>
  );
}
