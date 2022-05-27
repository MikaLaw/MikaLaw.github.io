import { fork } from "redux-saga/effects";
import authSagas from "./auth";
import fetchProfileWatcher from "./profile";
import fetchAddressListWatch from "./address";
import fetchCoordsWatch from "./coords";

export default function* rootSaga() {
  yield fork(authSagas);
  yield fork(fetchProfileWatcher);
  yield fork(fetchAddressListWatch);
  yield fork(fetchCoordsWatch);
}
