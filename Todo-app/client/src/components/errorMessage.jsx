import React from "react";
import { connect } from "react-redux";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function CustomizedSnackbars({ error }) {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setOpen(false);
  // };

  return (
    <div className={classes.root}>
      {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}> */}

      {error.message && (
        <div>
          <Alert severity="error">{error.message.message} </Alert>
        </div>
      )}

      {/* </Snackbar> */}
    </div>
  );
}
const MapStateToProps = (state) => {
  return {
    error: state.error,
  };
};

export default connect(MapStateToProps)(CustomizedSnackbars);
