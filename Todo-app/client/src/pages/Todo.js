import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getTodoasync,
  deleteTodoasync,
  updateTodoasync,
} from "../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import AlarmIcon from "@material-ui/icons/Alarm";
import ArchiveIcon from "@material-ui/icons/Archive";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 8,
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const getVisibilityFilter = (todos, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos.filter((todo) => !todo.archive);
    case "PENDING":
      return todos.filter((todo) => !todo.complete && !todo.archive);
    case "COMPLETE":
      return todos.filter((todo) => todo.complete && !todo.archive);
    case "ARCHIVE":
      return todos.filter((todo) => todo.archive);
    case "WORK":
      return todos.filter((todo) => todo.label === "work" && !todo.archive);
    case "PERSONAL":
      return todos.filter((todo) => todo.label === "Personal" && !todo.archive);
    default:
      return todos.filter((todo) => !todo.archive);
  }
};

const Todo = ({ data, getTodoasync, deleteTodoasync, updateTodoasync }) => {
  useEffect(() => {
    getTodoasync();
  }, []);

  const classes = useStyles();

  const HandleDelete = (id) => {
    deleteTodoasync(id);
  };

  const handleUpdate = (todo, val) => {
    todo[val] = !todo[val];

    updateTodoasync(todo._id, todo);
  };

  const showCard = data.length ? (
    data
      .slice(0)
      .reverse()
      .map(
        (todo) => (
          (todo.date = new Date(todo.date).toString().slice(0, 15)),
          (
            <div key={todo._id}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="primary"
                    gutterBottom
                  >
                    {todo.complete && (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {todo.label}&nbsp;&nbsp;&nbsp; Completed
                        <CheckCircleIcon />
                      </span>
                    )}
                    {!todo.complete && (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {todo.label}&nbsp;&nbsp;&nbsp;Pending
                        <TimelapseIcon />
                      </span>
                    )}
                  </Typography>

                  <Typography variant="h5" component="h2" color="secondary">
                    {todo.title}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {todo.date}
                    <AlarmIcon />
                  </Typography>
                  <Typography variant="body2" component="p">
                    {todo.discription}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      HandleDelete(todo._id);
                    }}
                  >
                    Delete
                  </Button>
                  {todo.complete && (
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={() => {
                        handleUpdate(todo, "complete");
                      }}
                    >
                      <TimelapseIcon />
                      setPending
                    </Button>
                  )}
                  {!todo.complete && (
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleUpdate(todo, "complete");
                      }}
                    >
                      <CheckCircleIcon />
                      setComplete
                    </Button>
                  )}
                  {todo.archive && (
                    <Button
                      size="small"
                      variant="contained"
                      color="default"
                      className={classes.button}
                      onClick={() => {
                        handleUpdate(todo, "archive");
                      }}
                    >
                      <UnarchiveIcon />
                      UnArchive
                    </Button>
                  )}
                  {!todo.archive && (
                    <Button
                      size="small"
                      onClick={() => {
                        handleUpdate(todo, "archive");
                      }}
                    >
                      <ArchiveIcon />
                      Archive
                    </Button>
                  )}
                </CardActions>
              </Card>
            </div>
          )
        )
      )
  ) : (
    <h1>No Data</h1>
  );
  return <div>{showCard}</div>;
};

export default connect(
  (state) => ({
    data: getVisibilityFilter(state.todo.todos, state.visible),
  }),
  { getTodoasync, deleteTodoasync, updateTodoasync }
)(Todo);
