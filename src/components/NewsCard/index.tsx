import { Card as CardComponent } from "@material-ui/core/";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
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
        <Typography className={classes.title}>{news.title}</Typography>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", paddingBottom: 5 }}>
            <Typography className={classes.score}>{news.score}</Typography>
            <Typography className={classes.author}>{news.by}</Typography>
          </div>
          <Link className={classes.buttonLink} to={`/news/${news.id}`}>
            <Button variant="contained">Learn more</Button>
          </Link>
        </div>
      </CardContent>
    </CardComponent>
  );
}
