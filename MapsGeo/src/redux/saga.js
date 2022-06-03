import { takeLatest, put, call, fork } from "redux-saga/effects";
import {
  fetchAddressRequest,
  fetchAddressSuccess,
  fetchAddressFailure,
} from "./actions";

export function* fetchAddressFlow(action) {
  const { apiService } = action.payload;
  try {
    const result = yield call(apiService.getAddress);

    let addressData = {
      towns: [],
      coords: [],
    };

    result.data
      .split(/\r?\n|\r/)
      .slice(1)
      .forEach((item) => {
        if (item.length !== 0) {
          addressData.towns.push({
            value: item.split(";")[1],
            coords: [item.split(";")[3], item.split(";")[4]],
          });
          addressData.coords.push([item.split(";")[3], item.split(";")[4]]);
        }
      });

    addressData.towns = addressData.towns
      .reduce((o, i) => {
        if (!o.find((v) => v.value === i.value)) {
          o.push(i);
        }
        return o;
      }, [])
      .sort((a, b) => (a.value > b.value ? 1 : -1));

    yield put(fetchAddressSuccess(addressData));
  } catch (error) {
    yield put(fetchAddressFailure(error.message));
  }
}

function* fetchAddressWatcher() {
  yield takeLatest(fetchAddressRequest, fetchAddressFlow);
}

export default function* rootSaga() {
  yield fork(fetchAddressWatcher);
}
