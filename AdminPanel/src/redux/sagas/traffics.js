import { takeLatest, call, put, fork } from "redux-saga/effects";
import {
  fetchTrafficsRequest,
  fetchTrafficsSuccess,
  fetchTrafficsFailure,
  fetchTrafficRequest,
  fetchTrafficSuccess,
  fetchTrafficFailure,
} from "../actions/traffics";

export function* fetchTrafficsFlow(action) {
  try {
    const { apiService, ...filters } = action.payload;
    const result = yield call(apiService.getTraffics, { ...filters });
    yield put(fetchTrafficsSuccess(result.data));
  } catch (error) {
    yield put(fetchTrafficsFailure(error.message));
  }
}

export function* fetchTrafficFlow(action) {
  try {
    const { apiService, id } = action.payload;
    const result = yield call(apiService.getTraffic, id);

    yield put(fetchTrafficSuccess(result));
  } catch (error) {
    yield put(fetchTrafficFailure(error.message));
  }
}

function* fetchTrafficsWatcher() {
  yield takeLatest(fetchTrafficsRequest, fetchTrafficsFlow);
}

function* fetchTrafficWatcher() {
  yield takeLatest(fetchTrafficRequest, fetchTrafficFlow);
}

export default function* trafficsSagas() {
  yield fork(fetchTrafficsWatcher);
  yield fork(fetchTrafficWatcher);
}
