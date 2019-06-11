import axios from "axios";
import { LOAD_MESSAGES, SEND_MESSAGE } from "./types";

// Load All Messages
export const loadMessages = () => dispatch => {
  axios
    .get("/api/messages")
    .then(res => dispatch({ type: LOAD_MESSAGES, payload: res.data }));
};

// Send New Messages
export const sendMessage = newMess => {
  return { type: SEND_MESSAGE, payload: newMess };
};
