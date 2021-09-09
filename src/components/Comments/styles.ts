import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    color: "#d1d1d1",
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
    color: "#d1d1d1",
    margin: "0",
  },
  comment: {
    fontSize: "14px",
    fontWeight: "normal",
    color: "#d1d1d1",
    opacity: "0.7",
    margin: "0",
    "& p": {
      margin: "0",
      "& a": {
        color: "#3e53b1",
      },
    },
  },

  commentTitle: {
    fontSize: "22px",
    fontWeight: "normal",
    color: "#d1d1d1",
    marginRight: "20px",
  },
  backButton: {
    borderColor: "#d1d1d1",
    color: "#d1d1d1",
  },
});
