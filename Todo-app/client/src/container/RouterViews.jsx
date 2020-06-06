import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Home from "../components/home";
import Authpage from "../pages/Authpage";
import NewTodo from "../pages/newTodo";
const RouterViews = ({ auth }) => (
  <main>
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route
        exact
        path="/login"
        render={() => (
          <Authpage path="login" isAuthenticated={auth.isAuthenticated} />
        )}
      />
      <Route
        exact
        path="/register"
        render={() => (
          <Authpage path="register" isAuthenticated={auth.isAuthenticated} />
        )}
      />
      <Route exact path="/new" render={() => <NewTodo />} />
    </Switch>
  </main>
);
export default withRouter(
  connect((state) => ({ auth: state.auth }))(RouterViews)
);
