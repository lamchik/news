import { Card as CardComponent } from "@material-ui/core/";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { News } from "../../domain/news";
import { useStyles } from "./styles";

type Props = {
  news: News;
};

export function NewsCard({ news }: Props) {
  const classes = useStyles();

  return (
    <CardComponent className={classes.card}>
      <CardContent className={classes.cardCont}>
        <Typography className={classes.date}>
          {news.time.toDateString()}
        </Typography>
        <Link className={classes.link} to={`/news/${news.id}`}>
          <Typography className={classes.title}>{news.title}</Typography>
        </Link>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", paddingBottom: 5 }}>
            <Typography className={classes.score}>{news.score}</Typography>
            <Typography className={classes.author}>{news.by}</Typography>
          </div>
        </div>
      </CardContent>
    </CardComponent>
  );
}
