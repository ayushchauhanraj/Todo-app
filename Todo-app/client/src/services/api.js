import axios from "axios";
const host = "https://create-todo-app.herokuapp.com";

export const setToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const call = async (meathod, path, data) => {
  const response = await axios[meathod](`${host}/${path}`, data);
  return response.data;
};

export default { setToken, call };
