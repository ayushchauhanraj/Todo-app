import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { visibilityFilter } from "../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArchiveIcon from "@material-ui/icons/Archive";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WorkIcon from "@material-ui/icons/Work";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import AllInboxIcon from "@material-ui/icons/AllInbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",

    "& > *": {
      marginTop: 10,
      marginBottom: 4,
    },
  },
}));

const Filter = (props) => {
  const classes = useStyles();

  const [selectedItem, setSelectedItem] = useState(0);

  const buttonSelected = (selButton) => {
    setSelectedItem(selButton);
  };
  useEffect(() => {
    props.visibility("SHOW_ALL");
  }, []);

  const [value, setValue] = useState([
    "SHOW_ALL",
    "COMPLETE",
    "PENDING",
    "PERSONAL",
    "WORK",
    "ARCHIVE",
  ]);

  const [icon] = useState([
    <AllInboxIcon />,
    <CheckCircleIcon />,
    <TimelapseIcon />,
    <AssignmentIndIcon />,
    <WorkIcon />,
    <ArchiveIcon />,
  ]);

  const buttons = value.map((val, i) => (
    <Button
      size="small"
      color="primary"
      id={i}
      key={i}
      variant={i === selectedItem ? "contained" : "outlined"}
      onClick={() => {
        props.visibility(value[i]);
        buttonSelected(i);
      }}
    >
      {icon[i]}
      {val}
    </Button>
  ));

  return <div className={classes.root}>{buttons}</div>;
};

const MapDisptachtoProps = (dispatch) => {
  return {
    visibility: (parms) => dispatch(visibilityFilter(parms)),
  };
};

export default connect((store) => ({}), MapDisptachtoProps)(Filter);
