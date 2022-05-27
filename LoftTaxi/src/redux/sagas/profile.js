import { takeLatest, call, put } from "redux-saga/effects";

import {
  fetchUserProfileRequest,
  fetchUserProfileSuccess,
  fetchUserProfileFailure,
} from "../actions/profile";

import { setUserProfile } from "../../service/api";

export function* fetchProfileFlow(action) {
  try {
    const userData = action.payload;
    yield call(setUserProfile, userData);
    yield put(fetchUserProfileSuccess(userData));
  } catch (error) {
    yield put(fetchUserProfileFailure({ error: error.message }));
  }
}

export default function* fetchProfileWatcher() {
  yield takeLatest(fetchUserProfileRequest, fetchProfileFlow);
}
