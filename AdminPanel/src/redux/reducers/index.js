import { combineReducers } from "redux";
import auth from "./auth";
import users from "./users";
import traffics from "./traffics";
import docs from "./docs";

const rootReducer = combineReducers({
  auth,
  users,
  traffics,
  docs,
});

export default rootReducer;
