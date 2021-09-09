import { Card as CardComponent } from "@material-ui/core/";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { News } from "../../domain/news";

type Props = {
  news: News;
};

const Title = styled(Typography)({
  fontSize: "18px",
  fontWeight: "normal",
  color: "#fafafa",
});

const Score = styled(Typography)({
  fontWeight: "lighter",
  fontSize: "12px",
  color: "#d1d1d1",
  opacity: "0.8",
  paddingRight: "10px",
});

const Date = styled(Typography)({
  fontSize: "13px",
  fontWeight: "lighter",
  color: "#d1d1d1",
});

const Author = styled(Typography)({
  fontSize: "12px",
  fontWeight: "lighter",
  color: "#d1d1d1",
});

const Card = styled(CardComponent)({
  backgroundColor: "#313238",
  height: "100%",
  padding: "15px",
  boxSizing: "border-box",
});

const CardCont = styled(CardContent)({
  padding: "0",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const ButtonLink = styled(Link)({
  textDecoration: "none",
});

export function NewsCard({ news }: Props) {
  return (
    <Card>
      <CardCont>
        <Date>{news.time.toDateString()}</Date>
        <Title>{news.title}</Title>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", paddingBottom: 5 }}>
            <Score>{news.score}</Score>
            <Author>{news.by}</Author>
          </div>
          <ButtonLink to={`/news/${news.id}`}>
            <Button variant="contained">Learn more</Button>
          </ButtonLink>
        </div>
      </CardCont>
    </Card>
  );
}
