import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import address from "./address";
import coords from "./coords";

const rootReducer = combineReducers({ auth, profile, address, coords });

export default rootReducer;
