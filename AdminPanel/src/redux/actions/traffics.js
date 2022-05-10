import { createAction } from "redux-actions";

export const fetchTrafficsRequest = createAction("FETCH_TRAFFICS_REQUEST");
export const fetchTrafficsSuccess = createAction("FETCH_TRAFFICS_SUCCES");
export const fetchTrafficsFailure = createAction("FETCH_TRAFFICS_FAILURE");

export const fetchTrafficRequest = createAction("FETCH_TRAFFIC_REQUEST");
export const fetchTrafficSuccess = createAction("FETCH_TRAFFIC_SUCCES");
export const fetchTrafficFailure = createAction("FETCH_TRAFFIC_FAILURE");

export const changeTrafficsFilter = createAction("CHANGE_TRAFFICS_FILTER");
