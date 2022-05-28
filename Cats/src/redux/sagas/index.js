import { fork } from "redux-saga/effects";
import catsSagas from "./cats";
import catsFavoriteSagas from "./favorite";

export default function* rootSaga() {
  yield fork(catsSagas);
  yield fork(catsFavoriteSagas);
}
