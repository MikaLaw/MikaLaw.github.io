import { takeLatest, call, put, fork } from "redux-saga/effects";

import {
  fetchAuthRequest,
  fetchAuthSuccess,
  fetchAuthFailure,
  logout,
} from "../actions/auth";
import {
  authUser,
  removeAuthDataInLocalStorage,
  setAuthDataInLocalStorage,
} from "../../service/api";

export function* fetchLogoutFlow() {
  try {
    yield call(removeAuthDataInLocalStorage);
  } catch (error) {
    yield put(fetchAuthFailure({ error: error.message }));
  }
}

export function* fetchAuthFlow(action) {
  try {
    const { email, password } = action.payload;

    const result = yield call(authUser, email, password);
    if (result.data.success) {
      yield call(setAuthDataInLocalStorage, result.data.token);
      yield put(fetchAuthSuccess());
    } else {
      yield put(fetchAuthFailure({ error: result.data.error }));
    }
  } catch (error) {
    yield put(fetchAuthFailure({ error: error.message }));
  }
}

function* fetchLogoutWatcher() {
  yield takeLatest(logout, fetchLogoutFlow);
}

function* fetchAuthWatcher() {
  yield takeLatest(fetchAuthRequest, fetchAuthFlow);
}

export default function* authSagas() {
  yield fork(fetchAuthWatcher);
  yield fork(fetchLogoutWatcher);
}
