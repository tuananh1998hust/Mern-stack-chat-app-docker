import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERR,
  LOGOUT,
  LOAD_USER
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: null,
  loading: true,
  msg: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        user: action.payload
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false
      };

    case LOGIN_FAIL:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: null,
        user: null,
        loading: true,
        msg: action.payload.msg
      };

    case AUTH_ERR:
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: null,
        user: null,
        loading: true,
        msg: []
      };

    default:
      return state;
  }
}
