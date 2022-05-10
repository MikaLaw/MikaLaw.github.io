import { fork } from "redux-saga/effects";
import authSagas from "./auth";
import userSagas from "./users";
import trafficsSagas from "./traffics";
import docsSagas from "./docs";

export default function* rootSaga() {
  yield fork(authSagas);
  yield fork(userSagas);
  yield fork(trafficsSagas);
  yield fork(docsSagas);
}
