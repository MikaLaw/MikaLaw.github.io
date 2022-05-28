import { combineReducers } from "redux";
import cats from "./cats";
import favorite from "./favorite";

const rootReducer = combineReducers({
  cats,
  favorite,
});

export default rootReducer;
