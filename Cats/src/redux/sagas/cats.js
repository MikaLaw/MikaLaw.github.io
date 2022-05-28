import { takeLatest, put, call, fork } from "redux-saga/effects";
import {
  fetchCatsRequest,
  fetchCatsSuccess,
  fetchMoreCatsSuccess,
  fetchCatsFailure,
  saveFavouriteRequest,
  saveFavouriteSuccess,
  saveFavouriteFailure,
} from "../actions/cats";
import ApiService from "../../service";

const apiService = new ApiService();

export function* fetchCatsFlow(action) {
  let { filters, force } = action.payload;

  try {
    const result = yield call(apiService.getCats, { ...filters });
    if (force) {
      yield put(fetchMoreCatsSuccess(result.data));
    } else {
      yield put(fetchCatsSuccess(result.data));
    }
  } catch (error) {
    yield put(fetchCatsFailure(error.message));
  }
}

export function* saveFavouriteFlow(action) {
  let { image_id, sub_id } = action.payload;

  try {
    yield call(apiService.saveFavouriteCats, {
      image_id,
      sub_id,
    });
    yield put(saveFavouriteSuccess());
  } catch (error) {
    yield put(saveFavouriteFailure());
  }
}

function* fetchCatsWatcher() {
  yield takeLatest(fetchCatsRequest, fetchCatsFlow);
}

function* saveFavouriteWatcher() {
  yield takeLatest(saveFavouriteRequest, saveFavouriteFlow);
}

export default function* catsSagas() {
  yield fork(fetchCatsWatcher);
  yield fork(saveFavouriteWatcher);
}
