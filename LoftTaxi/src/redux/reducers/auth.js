import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  fetchAuthRequest,
  fetchAuthSuccess,
  fetchAuthFailure,
  logout,
} from "../actions/auth";

const isAuthorized = handleActions(
  {
    [fetchAuthRequest]: () => false,
    [fetchAuthSuccess]: () => true,
    [fetchAuthFailure]: () => false,
    [logout]: () => false,
  },
  !!window.localStorage.getItem("token")
);

const isLoading = handleActions(
  {
    [fetchAuthRequest]: () => true,
    [fetchAuthSuccess]: () => false,
    [fetchAuthFailure]: () => false,
    [logout]: () => false,
  },
  false
);

const error = handleActions(
  {
    [fetchAuthRequest]: () => null,
    [fetchAuthSuccess]: () => null,
    [fetchAuthFailure]: (state, action) =>
      action.payload.error ? action.payload.error : null,
  },
  null
);

export default combineReducers({
  isAuthorized,
  isLoading,
  error,
});

export const getIsAuthorized = (state) => state.auth.isAuthorized;
export const getIsLoading = (state) => state.auth.isLoading;
export const getError = (state) => state.auth.error;
