import { combineReducers } from "redux";
import auth from "./userSlice";
import { Router } from "react-router-dom";

export default (history) => {
  combineReducers({
    router: Router(history),
    auth
  })
}