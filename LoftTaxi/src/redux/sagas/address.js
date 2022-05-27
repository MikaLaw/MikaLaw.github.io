import { takeLatest, call, put } from "redux-saga/effects";

import {
  fetchAddressListRequest,
  fetchAddressListSuccess,
  fetchAddressListFailure,
} from "../actions/address";
import { getAddressList } from "../../service/api";

export function* fetchAddressListSaga() {
  try {
    const data = yield call(getAddressList);
    yield put(fetchAddressListSuccess(data.data));
  } catch (e) {
    yield put(fetchAddressListFailure({ error: e.message }));
  }
}

export default function* fetchAddressListWatch() {
  yield takeLatest(fetchAddressListRequest, fetchAddressListSaga);
}
