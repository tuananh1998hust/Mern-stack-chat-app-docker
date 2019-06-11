import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERR,
  LOGOUT,
  LOAD_USER,
  LOAD_USERLIST,
  SET_CHAT_WITH_USER,
  UPDATE_AVATAR
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  loading: true,
  msg: [],
  userList: [],
  chatWithUser: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      console.log(action.payload.token);
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        loading: false
      };

    case LOGIN_FAIL:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        loading: true,
        msg: action.payload.msg
      };

    case AUTH_ERR:
    case LOGOUT:
      return {
        ...state,
        user: null,
        loading: true,
        msg: []
      };

    case LOAD_USERLIST:
      return {
        ...state,
        userList: action.payload
      };

    case SET_CHAT_WITH_USER:
      return {
        ...state,
        chatWithUser: state.userList.find(user => user._id === action.payload)
      };

    case UPDATE_AVATAR:
      return {
        ...state,
        userList: state.userList.map(user => {
          if (user._id === action.payload._id) {
            user = action.payload;
          }

          return user;
        })
      };

    default:
      return state;
  }
}
