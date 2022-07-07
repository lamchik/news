import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  title: {
    fontSize: "1.5rem",
    fontWeight: "bolder",
    color: "#444444",
    transition: "all .2s linear",
    "&:hover": {
      textDecoration: "underline",
      opacity: "0.7",
    },
  },

  date: {
    fontSize: "1rem",
    fontWeight: "lighter",
    color: "#757575",
  },

  score: {
    fontWeight: "lighter",
    fontSize: ".875rem",
    color: "#569dff",
    opacity: "0.8",
    paddingRight: "10px",
  },

  author: {
    fontSize: ".875rem",
    fontWeight: "lighter",
    color: "#569dff",
  },

  card: {
    backgroundColor: "#ffffff",
    height: "18rem",
    width: "23rem",
    padding: "1rem",
    boxSizing: "border-box",
    boxShadow: "0.5rem 0.7rem 1rem rgba(0, 0, 0, 0.5)",
    borderRadius: "1rem",
  },

  cardCont: {
    padding: "0",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  link: {
    textDecoration: "none",
  },
});
