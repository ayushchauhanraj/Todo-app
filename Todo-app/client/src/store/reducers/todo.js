import { CREATE_TODO, GET_TODO, LOADING, SUCCESS } from "../actionTypes";

const initialState = {
  loading: false,
  success: false,
  todos: [],
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODO:
      return {
        ...state,
        todos: action.value,
        loading: false,
        success: false,
      };
    case CREATE_TODO:
      return {
        ...state,
        todos: state.todos.concat(action.value),
        loading: false,
      };

    case LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case SUCCESS:
      return {
        ...state,
        success: !state.success,
      };
    default:
      return { ...state };
  }
};

export default reducer;
