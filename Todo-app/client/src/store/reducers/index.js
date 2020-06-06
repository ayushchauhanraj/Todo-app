import { combineReducers } from "redux";
import error from "./error";
import auth from "./auth";
import { reducer as todo } from "./todo";
import visible from "./visible";
export default combineReducers({ auth, error, todo, visible });
