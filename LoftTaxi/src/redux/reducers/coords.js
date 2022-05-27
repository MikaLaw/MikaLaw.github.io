import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  fetchCoordsRequest,
  fetchCoordsSuccess,
  fetchCoordsFailure,
  fetchNewRoudRequest,
} from "../actions/coords";

const coords = handleActions(
  {
    [fetchCoordsRequest]: () => [],
    [fetchNewRoudRequest]: () => [],
    [fetchCoordsSuccess]: (state, action) => action.payload.data,
    [fetchCoordsFailure]: () => [],
  },
  []
);

const isLoading = handleActions(
  {
    [fetchCoordsRequest]: () => true,
    [fetchCoordsSuccess]: () => false,
    [fetchCoordsFailure]: () => false,
  },
  false
);

const isLoaded = handleActions(
  {
    [fetchCoordsRequest]: () => false,
    [fetchCoordsSuccess]: () => true,
    [fetchCoordsFailure]: () => false,
    [fetchNewRoudRequest]: () => false,
  },
  false
);

const error = handleActions(
  {
    [fetchCoordsRequest]: () => null,
    [fetchCoordsSuccess]: () => null,
    [fetchCoordsFailure]: (state, action) =>
      action.payload.error ? action.payload.error : null,
  },
  null
);

export default combineReducers({
  coords,
  isLoading,
  isLoaded,
  error,
});

export const getCoords = (state) => state.coords.coords;
export const getCoordsIsLoading = (state) => state.coords.isLoading;
export const getCoordsIsLoaded = (state) => state.coords.isLoaded;
export const getCoordsError = (state) => state.coords.error;
