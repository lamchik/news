import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter, Route } from "react-router-dom";
import { NewsPage } from "./pages/NewsPage";
import { NewsListPage } from "./pages/NewsListPage";

const useStyles = makeStyles({
  container: {
    backgroundColor: "#f6f6f6",
    minHeight: "100vh",
    padding: "2rem 16rem",
  },
});

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Container className={classes.container} maxWidth="xl">
        <Route exact path="/">
          <NewsListPage />
        </Route>
        <Route path="/news/:id">
          <NewsPage />
        </Route>
      </Container>
    </BrowserRouter>
  );
}

export default App;
