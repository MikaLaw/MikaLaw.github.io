import { handleAction, handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  changeUsersFilter,
  updateUsersRequest,
  updateUsersSuccess,
  updateUsersFailure,
} from "../actions/users";

const users = handleAction(
  fetchUsersSuccess,
  (state, action) => action.payload.users,
  []
);

const count = handleAction(
  fetchUsersSuccess,
  (state, action) => action.payload.count,
  0
);

const filters = handleAction(
  changeUsersFilter,
  (state, action) => {
    return action.payload;
  },
  { offset: 0, limit: 10 }
);

const isLoading = handleActions(
  {
    [fetchUsersRequest]: () => true,
    [fetchUsersSuccess]: () => false,
    [fetchUsersFailure]: () => false,
    [updateUsersRequest]: () => true,
    [updateUsersSuccess]: () => false,
    [updateUsersFailure]: () => false,
  },
  false
);

const error = handleActions(
  {
    [fetchUsersFailure]: (state, action) => action.payload,
    [updateUsersFailure]: (state, action) => action.payload,
  },
  null
);

export const selectUsers = (state) => state.users.users;
export const selectUsersCount = (state) => state.users.count;
export const selectUsersFilters = (state) => state.users.filters;
export const selectUsersIsLoading = (state) => state.users.isLoading;
export const selectUsersError = (state) => state.users.error;

export default combineReducers({
  users,
  count,
  filters,
  isLoading,
  error,
});
