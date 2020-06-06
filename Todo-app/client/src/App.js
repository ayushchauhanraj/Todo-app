import React from "react";
import { Provider } from "react-redux";
import decode from "jwt-decode";
import { store } from "./store";
import { setToken, setCurrentUser, addError } from "./store/actions";
import NavBar from "./container/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import RouterViews from "./container/RouterViews";

if (localStorage.jwtToken) {
  setToken(localStorage.jwtToken);
  try {
    store.dispatch(setCurrentUser(decode(localStorage.jwtToken)));
  } catch (err) {
    store.dispatch(setCurrentUser({}));
    store.dispatch(addError(err));
  }
}

function App() {
  return (
    <Router>
      <Provider store={store}>
        <NavBar />
        <RouterViews />
      </Provider>
    </Router>
  );
}

export default App;
