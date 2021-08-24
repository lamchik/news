import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { News } from '../../domain/news'

type Props = {
  news: News,
}

export function NewsCard({news}: Props) {

  return (
    <Card>
      <CardContent>
        <Typography>{news.title}</Typography>
        <Typography>{news.score}</Typography>
        <Typography>{news.by}</Typography>
        <Typography>{news.time.toDateString()}</Typography>
      </CardContent>
    </Card>
  );
}
