import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER,
  AUTH_ERR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  axios
    .get("/api/auth/user")
    .then(res => dispatch({ type: LOAD_USER, payload: res.data }))
    .catch(err => dispatch({ type: AUTH_ERR }));
};

// Login User
export const loginUser = user => dispatch => {
  axios
    .post("/api/auth", user)
    .then(res => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });

      dispatch(loadUser());
    })
    .catch(err =>
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data
      })
    );
};

// Register User
export const registerUser = user => dispatch => {
  axios
    .post("/api/users", user)
    .then(res => {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });

      dispatch(loadUser());
    })
    .catch(err =>
      dispatch({ type: REGISTER_FAIL, payload: err.response.data })
    );
};

// Log Out
export const logout = () => {
  return {
    type: LOGOUT
  };
};
