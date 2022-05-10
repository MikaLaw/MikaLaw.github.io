import { takeLatest, call, put, fork } from "redux-saga/effects";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  updateUsersRequest,
  updateUsersSuccess,
  updateUsersFailure,
} from "../actions/users";

export function* fetchUsersFlow(action) {
  try {
    const { apiService, ...filters } = action.payload;
    const result = yield call(apiService.getUsers, { ...filters });
    yield put(fetchUsersSuccess(result.data));
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}
export function* updateUsersFlow(action) {
  try {
    const { apiService, userId, cb, filters } = action.payload;
    yield call(apiService.updateUser, userId);
    yield put(updateUsersSuccess());
    yield call(cb, "Данные сохранены успешно!");
    try {
      const result = yield call(apiService.getUsers, { ...filters });
      yield put(fetchUsersSuccess(result.data));
    } catch (error) {
      yield put(fetchUsersFailure(error.message));
    }
  } catch (error) {
    yield put(updateUsersFailure(error.message));
  }
}

function* fetchUsersWatcher() {
  yield takeLatest(fetchUsersRequest, fetchUsersFlow);
}
function* updateUsersWatcher() {
  yield takeLatest(updateUsersRequest, updateUsersFlow);
}

export default function* userSagas() {
  yield fork(fetchUsersWatcher);
  yield fork(updateUsersWatcher);
}
