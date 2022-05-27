import { fetchCoordsSuccess, fetchCoordsFailure } from "../../actions/coords";
import { call, put } from "redux-saga/effects";
import { fetchCoordsSaga } from "../coords";
import { getCoords } from "../../../service/api";

describe("Saga coords:", () => {
  it("call getCoords", () => {
    const action = { payload: { address1: "Пулково", address2: "Эрмитаж" } };
    const saga = fetchCoordsSaga(action);
    expect(saga.next().value).toEqual(call(getCoords, "Пулково", "Эрмитаж"));
  });

  it("dispatch action fetchCoordsSuccess from call on success call", () => {
    const action = { payload: { address1: "Пулково", address2: "Эрмитаж" } };
    const data = [
      [30.272182, 59.800652],
      [30.274046, 59.800365],
    ];

    const saga = fetchCoordsSaga(action);
    saga.next();

    expect(saga.next({ data: data }).value).toEqual(
      put(fetchCoordsSuccess({ data: data }))
    );
  });

  it("dispatch action fetchCoordsFailure from call on failure call", () => {
    const action = { payload: { address1: "Пулково", address2: "Эрмитаж" } };
    const error = new Error("test error");
    const saga = fetchCoordsSaga(action);
    saga.next();

    expect(saga.throw(error).value).toEqual(
      put(fetchCoordsFailure({ error: error.message }))
    );
  });
});
