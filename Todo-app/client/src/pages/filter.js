import React from "react";
import { connect } from "react-redux";
import { visibilityFilter } from "../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArchiveIcon from "@material-ui/icons/Archive";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import WorkIcon from "@material-ui/icons/Work";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import AllInboxIcon from "@material-ui/icons/AllInbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      marginTop: 4,
      marginBottom: 4,
    },
  },
}));

const Filter = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup
        color="primary"
        size="small"
        aria-label="outlined primary button group"
      >
        <Button
          color="primary"
          size="small"
          onClick={() => props.visibility("SHOW_ALL")}
        >
          <AllInboxIcon />
          All
        </Button>
        <Button
          color="primary"
          size="small"
          onClick={() => props.visibility("COMPLETE")}
        >
          <CheckCircleIcon /> Completed
        </Button>
        <Button
          color="primary"
          size="small"
          onClick={() => props.visibility("PENDING")}
        >
          <TimelapseIcon /> Pending
        </Button>

        <Button
          color="primary"
          size="small"
          onClick={() => props.visibility("WORK")}
        >
          <WorkIcon />
          Work
        </Button>
        <Button
          color="primary"
          size="small"
          onClick={() => props.visibility("PERSONAL")}
        >
          <AssignmentIndIcon />
          Personal
        </Button>
        <Button
          color="primary"
          size="small"
          onClick={() => props.visibility("ARCHIVE")}
        >
          <ArchiveIcon />
          Archived
        </Button>
      </ButtonGroup>
    </div>
  );
};

const MapDisptachtoProps = (dispatch) => {
  return {
    visibility: (parms) => dispatch(visibilityFilter(parms)),
  };
};

export default connect((store) => ({}), MapDisptachtoProps)(Filter);
