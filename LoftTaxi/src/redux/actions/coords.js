import { createActions } from "redux-actions";

export const {
  fetchCoordsRequest,
  fetchCoordsSuccess,
  fetchCoordsFailure,
  fetchNewRoudRequest,
} = createActions(
  "FETCH_COORDS_REQUEST",
  "FETCH_COORDS_SUCCESS",
  "FETCH_COORDS_FAILURE",
  "FETCH_NEW_ROUD_REQUEST"
);
