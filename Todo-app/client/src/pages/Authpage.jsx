import React from "react";
import Auth from "../components/auth";
import ErrorMessage from "../components/errorMessage";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LinearBuffer from "../components/loading";
const Authpage = ({ path, isAuthenticated, loading }) => {
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      {loading && <LinearBuffer />}
      <ErrorMessage />
      <Auth path={path} />
    </div>
  );
};
export default connect((state) => ({
  loading: state.todo.loading,
}))(Authpage);
