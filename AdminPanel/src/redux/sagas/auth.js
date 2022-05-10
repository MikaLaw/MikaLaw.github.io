import { takeLatest, call, put, fork } from "redux-saga/effects";
import Cookies from "js-cookie";
import {
  fetchLoginRequest,
  fetchLoginSuccess,
  fetchLoginFailure,
  fetchLogout,
} from "../actions/auth";

export function* fetchLogoutFlow() {
  Cookies.remove("username");
  Cookies.remove("jwtToken");
  yield call(fetchLogout);
}

export function* fetchLoginFlow(action) {
  try {
    const { apiService, username, password } = action.payload;
    const result = yield call(apiService.authUser, username, password);

    if (result.data.success) {
      Cookies.set("username", username);
      Cookies.set("jwtToken", result.data.token);
      yield put(
        fetchLoginSuccess({ token: result.data.token, username: username })
      );
    } else {
      Cookies.remove("username");
      Cookies.remove("jwtToken");
      yield put(fetchLoginFailure(result.data.error));
    }
  } catch (error) {
    Cookies.remove("username");
    Cookies.remove("jwtToken");
    yield put(fetchLoginFailure(error.message));
  }
}

function* fetchLogoutWatcher() {
  yield takeLatest(fetchLogout, fetchLogoutFlow);
}

function* fetchAuthWatcher() {
  yield takeLatest(fetchLoginRequest, fetchLoginFlow);
}

export default function* authSagas() {
  yield fork(fetchAuthWatcher);
  yield fork(fetchLogoutWatcher);
}
