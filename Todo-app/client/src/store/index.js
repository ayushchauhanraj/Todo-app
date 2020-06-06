import { createStore, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";

import rootReducer from "./reducers";

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk)
    //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
    //     Window.__REDUX__DEVTOOLS__EXTENSION__()
  )
);
