import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  titleButtonWrap: {
    display: "flex",
  },
  header: {
    fontSize: "32px",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#569dff",
    margin: "0 30px 30px 0",
  },

  button: {
    width: "70px",
    height: "35px",
    borderColor: "#222327",
    color: "#222327",
    marginTop: "7px",
    transition: "all .2s linear",
    "&:hover": {
      borderColor: "#569dff",
      color: "#569dff",
    },
  },
});
