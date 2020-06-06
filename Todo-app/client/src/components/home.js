import React from "react";
import Todo from "../pages/Todo";
import { connect } from "react-redux";
import ErrorMessage from "../components/errorMessage";
import Filter from "../pages/filter";
import LinearIndeterminate from "./progress";
import StickyFront from "../pages/frontPage";
const Home = ({ auth, loading }) => (
  <div>
    {auth.isAuthenticated && (
      <div>
        <Filter />
        <ErrorMessage />
        {loading && <LinearIndeterminate />}
        <Todo />
      </div>
    )}
    {!auth.isAuthenticated && <StickyFront />}
  </div>
);

export default connect((state) => ({
  auth: state.auth,
  loading: state.todo.loading,
}))(Home);
