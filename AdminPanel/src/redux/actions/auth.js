import { createAction } from "redux-actions";

export const fetchLoginRequest = createAction("FETCH_LOGIN_REQUEST");
export const fetchLoginSuccess = createAction("FETCH_LOGIN_SUCCES");
export const fetchLoginFailure = createAction("FETCH_LOGIN_FAILURE");
export const fetchLogout = createAction("FETCH_LOGOUT");
