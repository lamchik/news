import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    color: "#d1d1d1",
  },

  container: {
    padding: "50px 50px",
  },

  backButton: {
    borderColor: "#d1d1d1",
    color: "#d1d1d1",
  },
  backLink: {
    textDecoration: "none",
    marginTop: "50px",
  },
  author: {
    fontSize: "18px",
    fontWeight: "lighter",
    color: "#d1d1d1",
  },
  date: {
    fontSize: "20px",
    fontWeight: "lighter",
    color: "#d1d1d1",
  },
  title: {
    fontSize: "26px",
    fontWeight: "normal",
    color: "#fafafa",
  },
  card: {
    backgroundColor: "#313238",
    height: "100%",
    padding: "15px",
    boxSizing: "border-box",
    margin: "50px 0px",
  },
});
