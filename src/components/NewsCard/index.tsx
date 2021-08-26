import {Card as CardComponent} from '@material-ui/core/';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';

import { News } from '../../domain/news'

type Props = {
  news: News,
}

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #9B7AEB 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 10px',
  maxHeight: '30px',
});

const Title = styled(Typography)({
  fontSize: "18px",
  fontWeight: "bold",
  color: '#F1ECFE',
});


const Score = styled(Typography)({
  fontWeight: "lighter",
  fontSize: "12px",
  color: '#D1CCDB',
  opacity: '0.8',
  paddingRight: '10px'
});

const Date = styled(Typography)({
  fontSize: "13px",
  fontWeight: "lighter",
  color: '#DFDAEB'
});

const Author = styled(Typography)({
  fontSize: "12px",
  fontWeight: "lighter",
  color: '#DFDAEB'
});

const Card = styled(CardComponent)({
  backgroundColor: '#5F5161',
  height: "100%",
  padding: '15px',
  boxSizing: 'border-box',
});

const CardCont = styled(CardContent)({
  padding: '0',
  height: "100%",
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const ScoreAuthorWrap = styled(Typography)({
  display: 'flex',
  paddingBottom: '5px'
});

export function NewsCard({news}: Props) {

  return (
    <Card>
      <CardCont>
        <Date>{news.time.toDateString()}</Date>
        <Title>{news.title}</Title>
        <Typography>
          <ScoreAuthorWrap>
            <Score>{news.score}</Score>
            <Author>{news.by}</Author>
          </ScoreAuthorWrap>
          <MyButton>Learn more</MyButton>
        </Typography>
      </CardCont>
    </Card>
  );
}
