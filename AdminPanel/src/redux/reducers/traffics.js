import { handleAction, handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  fetchTrafficsRequest,
  fetchTrafficsSuccess,
  fetchTrafficsFailure,
  fetchTrafficRequest,
  fetchTrafficSuccess,
  fetchTrafficFailure,
  changeTrafficsFilter,
} from "../actions/traffics";

const traffics = handleAction(
  fetchTrafficsSuccess,
  (state, action) => action.payload.traffics,
  []
);

const traffic = handleAction(
  fetchTrafficSuccess,
  (state, action) => action.payload[0],
  []
);

const count = handleAction(
  fetchTrafficsSuccess,
  (state, action) => action.payload.count,
  0
);

const filters = handleAction(
  changeTrafficsFilter,
  (state, action) => action.payload,
  { offset: 0, limit: 10 }
);

const isLoading = handleActions(
  {
    [fetchTrafficsRequest]: () => true,
    [fetchTrafficsSuccess]: () => false,
    [fetchTrafficsFailure]: () => false,
    [fetchTrafficRequest]: () => true,
    [fetchTrafficSuccess]: () => false,
    [fetchTrafficFailure]: () => false,
  },
  false
);

const error = handleActions(
  {
    [fetchTrafficsFailure]: (state, action) => action.payload,
    [fetchTrafficFailure]: (state, action) => action.payload,
  },

  null
);

export const selectTraffics = (state) => state.traffics.traffics;
export const selectTraffic = (state) => state.traffics.traffic;
export const selectTrafficsCount = (state) => state.traffics.count;
export const selectTrafficsFilters = (state) => state.traffics.filters;
export const selectTrafficsIsLoading = (state) => state.traffics.isLoading;
export const selectTrafficsError = (state) => state.traffics.error;

export default combineReducers({
  traffics,
  traffic,
  count,
  filters,
  isLoading,
  error,
});
