import { call, put } from "redux-saga/effects";
import {
  fetchUserProfileSuccess,
  fetchUserProfileFailure,
} from "../../actions/profile";
import { setUserProfile } from "../../../service/api";
import { fetchProfileFlow } from "../profile";

describe("Saga coords:", () => {
  it("call getCoords", () => {
    const action = {
      payload: {
        userName: "AS SD",
        cardNumber: "1234123412341234",
        cardDate: "12/2024",
        cardCVV: "223",
      },
    };
    const userData = {
      userName: "AS SD",
      cardNumber: "1234123412341234",
      cardDate: "12/2024",
      cardCVV: "223",
    };
    const saga = fetchProfileFlow(action);
    expect(saga.next().value).toEqual(call(setUserProfile, userData));
  });

  it("dispatch action fetchCoordsSuccess from call on success call", () => {
    const action = {
      payload: {
        userName: "AS SD",
        cardNumber: "1234123412341234",
        cardDate: "12/2024",
        cardCVV: "223",
      },
    };
    const userData = {
      userName: "AS SD",
      cardNumber: "1234123412341234",
      cardDate: "12/2024",
      cardCVV: "223",
    };

    const saga = fetchProfileFlow(action);
    saga.next();

    expect(saga.next({ data: userData }).value).toEqual(
      put(fetchUserProfileSuccess(userData))
    );
  });

    it("dispatch action fetchCoordsFailure from call on failure call", () => {
      const action = {
        payload: {
          userName: "AS SD",
          cardNumber: "1234123412341234",
          cardDate: "12/2024",
          cardCVV: "223",
        },
      };
      const error = new Error("test error");
      const saga = fetchProfileFlow(action);
      saga.next();

      expect(saga.throw(error).value).toEqual(
        put(fetchUserProfileFailure({ error: error.message }))
      );
    });
});
