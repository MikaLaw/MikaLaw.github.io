import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  fetchUserProfileRequest,
  fetchUserProfileSuccess,
  fetchUserProfileFailure,
} from "../actions/profile";

const userProfile = handleActions(
  {
    [fetchUserProfileRequest]: () => null,
    [fetchUserProfileSuccess]: (state, action) => action.payload,
    [fetchUserProfileFailure]: () => null,
  },
  JSON.parse(window.localStorage.getItem("profile"))
);

const isLoading = handleActions(
  {
    [fetchUserProfileRequest]: () => true,
    [fetchUserProfileSuccess]: () => false,
    [fetchUserProfileFailure]: () => false,
  },
  false
);

const error = handleActions(
  {
    [fetchUserProfileRequest]: () => null,
    [fetchUserProfileSuccess]: () => null,
    [fetchUserProfileFailure]: () => (state, action) =>
      action.payload.error ? action.payload.error : null,
  },
  null
);

export default combineReducers({
  userProfile,
  isLoading,
  error,
});

export const getUserProfile = (state) => state.profile.userProfile;
export const getIsLoading = (state) => state.profile.isLoading;
