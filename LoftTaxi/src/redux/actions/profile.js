import { createActions } from "redux-actions";

export const {
  fetchUserProfileRequest,
  fetchUserProfileSuccess,
  fetchUserProfileFailure,
} = createActions(
  "FETCH_USER_PROFILE_REQUEST",
  "FETCH_USER_PROFILE_SUCCESS",
  "FETCH_USER_PROFILE_FAILURE"
);
