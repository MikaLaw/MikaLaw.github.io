import {
  fetchAddressListSuccess,
  fetchAddressListFailure,
} from "../../actions/address";
import { call, put } from "redux-saga/effects";
import { fetchAddressListSaga } from "../address";
import { getAddressList } from "../../../service/api";

describe("Saga address:", () => {
  it("call getAddressList", () => {
    const action = { payload: {} };
    const saga = fetchAddressListSaga(action);
    expect(saga.next().value).toEqual(call(getAddressList));
  });

  it("dispatch action fetchAddressListSuccess from call on success call", () => {
    const action = { payload: {} };
    const data = {
      addresses: [
        "Пулково (LED)",
        "Эрмитаж",
        "Кинотеатр Аврора",
        "Мариинский театр",
      ],
    };
    const saga = fetchAddressListSaga(action);
    saga.next();
    expect(saga.next({ data: data }).value).toEqual(
      put(fetchAddressListSuccess(data))
    );
  });

  it("dispatch action fetchAddressListFailure from call on failure call", () => {
    const action = { payload: {} };
    const error = new Error("test error");
    const saga = fetchAddressListSaga(action);
    saga.next();

    expect(saga.throw(error).value).toEqual(
      put(fetchAddressListFailure({ error: error.message }))
    );
  });
});
