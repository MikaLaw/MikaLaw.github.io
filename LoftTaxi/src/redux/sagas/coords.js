import { takeLatest, call, put } from "redux-saga/effects";

import {
  fetchCoordsRequest,
  fetchCoordsSuccess,
  fetchCoordsFailure,
} from "../actions/coords";
import { getCoords } from "../../service/api";

export function* fetchCoordsSaga(action) {
  try {
    const { address1, address2 } = action.payload;

    const data = yield call(getCoords, address1, address2);
    yield put(fetchCoordsSuccess(data));
  } catch (e) {
    yield put(fetchCoordsFailure({ error: e.message }));
  }
}

export default function* fetchCoordsWatch() {
  yield takeLatest(fetchCoordsRequest, fetchCoordsSaga);
}
