import { takeLatest, call, put, fork } from "redux-saga/effects";
import {
  fetchDocsRequest,
  fetchDocsSuccess,
  fetchDocsFailure,
  updateDocsRequest,
  updateDocsSuccess,
  updateDocsFailure,
} from "../actions/docs";

export function* fetchDocsFlow(action) {
  try {
    const { apiService } = action.payload;
    const result = yield call(apiService.getDocs);

    yield put(fetchDocsSuccess(result.data));
  } catch (error) {
    yield put(fetchDocsFailure(error.message));
  }
}
export function* updateDocsFlow(action) {
  try {
    const { apiService, text, cb } = action.payload;
    yield call(apiService.updateDocs, text);
    yield put(updateDocsSuccess());
    yield call(cb, "Данные сохранены успешно!");
    try {
      const result = yield call(apiService.getDocs);
      yield put(fetchDocsSuccess(result.data));
    } catch (error) {
      yield put(fetchDocsFailure(error.message));
    }
  } catch (error) {
    yield put(updateDocsFailure(error.message));
  }
}

function* fetchDocsWatcher() {
  yield takeLatest(fetchDocsRequest, fetchDocsFlow);
}
function* updateDocsWatcher() {
  yield takeLatest(updateDocsRequest, updateDocsFlow);
}

export default function* docsSagas() {
  yield fork(fetchDocsWatcher);
  yield fork(updateDocsWatcher);
}
