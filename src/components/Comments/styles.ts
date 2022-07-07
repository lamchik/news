import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    color: "#222327",
  },
  commentWrap: {
    margin: "20px 0 0 0",
  },
  commentTitleButtonWrap: {
    display: "flex",
  },
  commentBy: {
    fontSize: "16px",
    fontWeight: "normal",
    color: "#222327",
    margin: "0",
  },
  comment: {
    fontSize: "14px",
    fontWeight: "normal",
    color: "#222327",
    opacity: "0.7",
    margin: "0",
    "& p": {
      margin: "0",
      "& a": {
        color: "#222327",
      },
    },
  },

  commentTitle: {
    fontSize: "1.5rem",
    fontWeight: "normal",
    color: "#222327",
    marginRight: "1.5rem",
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
});
