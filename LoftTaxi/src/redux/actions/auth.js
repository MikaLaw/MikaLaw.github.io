import { createActions } from "redux-actions";

export const { fetchAuthRequest, fetchAuthSuccess, fetchAuthFailure, logout } =
  createActions(
    "FETCH_AUTH_REQUEST",
    "FETCH_AUTH_SUCCESS",
    "FETCH_AUTH_FAILURE",
    "LOGOUT"
  );
