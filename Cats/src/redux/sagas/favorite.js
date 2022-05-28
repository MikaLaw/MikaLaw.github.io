import { takeLatest, put, call, fork } from "redux-saga/effects";
import {
  fetchFavoriteCatsRequest,
  fetchFavoriteCatsSuccess,
  fetchMoreFavoriteCatsSuccess,
  fetchFavoriteCatsFailure,
  deleteFavouriteRequest,
  deleteFavouriteSuccess,
  deleteFavouriteFailure,
} from "../actions/favorite";
import ApiService from "../../service";

const apiService = new ApiService();

export function* fetchFavoriteCatsFlow(action) {
  let { filters, force } = action.payload;

  try {
    const result = yield call(apiService.getFavoriteCats, { ...filters });
    if (force) {
      yield put(fetchMoreFavoriteCatsSuccess(result.data));
    } else {
      yield put(fetchFavoriteCatsSuccess(result.data));
    }
  } catch (error) {
    yield put(fetchFavoriteCatsFailure(error.message));
  }
}

export function* deleteFavouriteFlow(action) {
  let { image_id } = action.payload;

  try {
    const result = yield call(apiService.deleteFavouriteCats, {
      image_id,
    });
    yield put(deleteFavouriteSuccess(result.data));
    const resultData = yield call(apiService.getFavoriteCats, {
      page: 1,
      limit: 5,
    });
    yield put(fetchFavoriteCatsSuccess(resultData.data));
  } catch (error) {
    yield put(deleteFavouriteFailure(error.message));
  }
}

function* fetchFavoriteCatsWatcher() {
  yield takeLatest(fetchFavoriteCatsRequest, fetchFavoriteCatsFlow);
}

function* deleteFavouriteWatcher() {
  yield takeLatest(deleteFavouriteRequest, deleteFavouriteFlow);
}

export default function* catsFavoriteSagas() {
  yield fork(fetchFavoriteCatsWatcher);
  yield fork(deleteFavouriteWatcher);
}
