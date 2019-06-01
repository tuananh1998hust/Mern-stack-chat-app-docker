import { LOAD_MESSAGES, SEND_MESSAGE } from "../actions/types";

const initialState = {
  messList: [],
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_MESSAGES:
      return {
        ...state,
        messList: action.payload,
        loading: false
      };

    case SEND_MESSAGE:
      return {
        ...state,
        messList: [action.payload, ...state.messList]
      };

    default:
      return state;
  }
}
