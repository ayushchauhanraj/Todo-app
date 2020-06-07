import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createTodoasync } from "../store/actions";
import "date-fns";
import SaveMessage from "../components/saveMessage";
import { Redirect } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import Loading from "../components/loading";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "Personal",
      title: "",
      discription: "",
      complete: false,
      archive: false,
      date: new Date(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.createTodoasync(this.state);
    this.setState({ title: "", discription: "" });
  };

  render() {
    if (!this.props.auth.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="formdiv">
        {this.props.loading && <Loading />}
        {this.props.success && <SaveMessage />}
        <form onSubmit={this.handleSubmit}>
          <label>Label</label>
          <select name="label" onChange={this.handleChange}>
            <option value="personal">PERSONAL</option>
            <option value="work">WORK</option>
          </select>
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Task title"
            required
            className="tex"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <label>Discription</label>
          <div className="col-75">
            <textarea
              type="text"
              placeholder="Task discription"
              rows="4"
              name="discription"
              value={this.state.discription}
              onChange={this.handleChange}
              maxLength="300"
              required
            />
          </div>
          <Grid container justify="space-around">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Task Completion Date"
                format="MM/dd/yyyy"
                value={this.state.date}
                onChange={(event) => {
                  this.setState({ date: event });
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>{" "}
          <input type="submit" value="Submit" className="sel" />
          <br />
          <Link to="/">
            <Fab color="secondary" aria-label="add">
              <ArrowBackIcon />
            </Fab>
          </Link>
        </form>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    loading: state.todo.loading,
    auth: state.auth,
    success: state.todo.success,
  }),
  {
    createTodoasync,
  }
)(TodoForm);
