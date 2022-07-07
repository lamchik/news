import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    color: "#d1d1d1",
  },

  container: {
    padding: "50px 50px",
  },

  backButton: {
    borderColor: "#222327",
    color: "#222327",
    transition: "all .2s linear",
    "&:hover": {
      borderColor: "#569dff",
      color: "#569dff",
    },
  },

  backLink: {
    textDecoration: "none",
    marginTop: "50px",
  },

  author: {
    fontSize: "1rem",
    fontWeight: "lighter",
    color: "#569dff",
    marginTop: "4rem",
  },

  date: {
    fontSize: "1.3rem",
    fontWeight: "lighter",
    color: "#757575",
    marginBottom: "2rem",
  },

  title: {
    fontSize: "2rem",
    fontWeight: "bolder",
    color: "#444444",
    marginBottom: "1rem",
  },

  link: {
    color: "#569dff",
  },

  card: {
    backgroundColor: "#ffffff",
    boxShadow: "0.5rem 1rem 1rem rgba(0, 0, 0, 0.5)",
    height: "100%",
    padding: "1rem",
    boxSizing: "border-box",
    margin: "3rem 0px",
  },
});
