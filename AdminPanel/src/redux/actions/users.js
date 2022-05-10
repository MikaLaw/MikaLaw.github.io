import { createAction } from "redux-actions";

export const fetchUsersRequest = createAction("FETCH_USERS_REQUEST");
export const fetchUsersSuccess = createAction("FETCH_USERS_SUCCES");
export const fetchUsersFailure = createAction("FETCH_USERS_FAILURE");

export const updateUsersRequest = createAction("UPDATE_USERS_REQUEST");
export const updateUsersSuccess = createAction("UPDATE_USERS_SUCCES");
export const updateUsersFailure = createAction("UPDATE_USERS_FAILURE");

export const changeUsersFilter = createAction("CHANGE_USERS_FILTER");
