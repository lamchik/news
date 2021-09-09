import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  title: {
    fontSize: "18px",
    fontWeight: "normal",
    color: "#fafafa",
  },

  score: {
    fontWeight: "lighter",
    fontSize: "12px",
    color: "#d1d1d1",
    opacity: "0.8",
    paddingRight: "10px",
  },

  date: {
    fontSize: "13px",
    fontWeight: "lighter",
    color: "#d1d1d1",
  },

  author: {
    fontSize: "12px",
    fontWeight: "lighter",
    color: "#d1d1d1",
  },

  card: {
    backgroundColor: "#313238",
    height: "100%",
    padding: "15px",
    boxSizing: "border-box",
  },

  cardCont: {
    padding: "0",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  buttonLink: {
    textDecoration: "none",
  },
});
