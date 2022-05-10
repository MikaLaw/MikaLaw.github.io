import { handleAction, handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  fetchLoginRequest,
  fetchLoginSuccess,
  fetchLoginFailure,
  fetchLogout,
} from "../actions/auth";
import Cookies from "js-cookie";

const token = handleActions(
  {
    [fetchLoginSuccess]: (state, action) => action.payload.token,
    [fetchLogout]: () => null,
  },
  Cookies.get("jwtToken") || null
);

const username = handleActions(
  {
    [fetchLoginSuccess]: (state, action) => action.payload.username,
    [fetchLogout]: () => null,
  },
  Cookies.get("username") || null
);

const isLoading = handleActions(
  {
    [fetchLoginRequest]: () => true,
    [fetchLoginSuccess]: () => false,
    [fetchLoginFailure]: () => false,
  },
  false
);

const error = handleAction(
  fetchLoginFailure,
  (state, action) => action.payload,
  null
);

export const selectAuthError = (state) => state.auth.error;

export default combineReducers({
  token,
  username,
  isLoading,
  error,
});
