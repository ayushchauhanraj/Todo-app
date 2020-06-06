import { CREATE_TODO, GET_TODO, LOADING, SUCCESS } from "../actionTypes";

import { addError, removeError } from "../actions";
import API from "../../services/api";

const createTodo = (data) => {
  return { type: CREATE_TODO, value: data };
};

const getTodo = (data) => {
  return { type: GET_TODO, value: data };
};

export const loading = () => {
  return { type: LOADING };
};
export const success = () => {
  return { type: SUCCESS };
};
export const createTodoasync = (data) => {
  return async (dispatch) => {
    try {
      dispatch(loading());
      const todo = await API.call("post", "api/create", data);
      dispatch(success());
      dispatch(createTodo(todo));
      dispatch(removeError());
      setTimeout(() => {
        dispatch(success());
      }, 5000);
    } catch (err) {
      const { error } = err.response.data;
      dispatch(addError(error));
    }
  };
};

export const updateTodoasync = (path, todo) => {
  return async (dispatch) => {
    try {
      dispatch(loading());
      const data = await API.call("post", `api/${path}`, todo);
      dispatch(getTodo(data));
      dispatch(removeError());
    } catch (err) {
      const { error } = err.response.data;
      dispatch(addError(error));
    }
  };
};

export const deleteTodoasync = (path) => {
  return async (dispatch) => {
    try {
      dispatch(loading());
      const data = await API.call("delete", `api/${path}`);
      dispatch(getTodo(data));
      dispatch(removeError());
    } catch (err) {
      const { error } = err.response.data;
      dispatch(addError(error));
    }
  };
};

export const getTodoasync = () => {
  return async (dispatch) => {
    dispatch(loading());
    const data = await API.call("get", "api/get");

    dispatch(getTodo(data));

    dispatch(removeError());
    try {
    } catch (err) {
      const { error } = err.response.data;
      dispatch(addError(error));
    }
  };
};
