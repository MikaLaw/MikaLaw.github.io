import { call, put } from "redux-saga/effects";
import { fetchAuthSuccess, fetchAuthFailure, logout } from "../../actions/auth";
import {
  authUser,
  removeAuthDataInLocalStorage,
  setAuthDataInLocalStorage,
} from "../../../service/api";
import { fetchAuthFlow, fetchLogoutFlow } from "../auth";

describe("Сага authFlow", () => {
  describe("Сценарий c успешной авторизцией", () => {
    const action = { payload: { email: "test@gmail.com", password: "123" } };
    const saga = fetchAuthFlow(action);
    const token = "123";

    it("1. calls authUser with action.payload", () => {
      expect(saga.next().value).toEqual(
        call(authUser, "test@gmail.com", "123")
      );
    });

    it("2. call setAuthDataInLocalStorage", () => {
      expect(
        saga.next({ data: { success: true, token: "123" } }).value
      ).toEqual(call(setAuthDataInLocalStorage, token));
    });

    it("3. dispatch action fetchAuthSuccess from call on success call", () => {
      expect(saga.next().value).toEqual(put(fetchAuthSuccess()));
    });

    it("saga is finished", () => {
      expect(saga.next().done).toEqual(true);
    });
  });

  describe("Сценарий c не успешной авторизцией", () => {
    const action = { payload: { email: "test@gmail.com", password: "123" } };
    const saga = fetchAuthFlow(action);

    it("1. calls authUser with action.payload", () => {
      expect(saga.next().value).toEqual(
        call(authUser, "test@gmail.com", "123")
      );
    });

    it("2. dispatch action fetchAuthFailure from call on error call", () => {
      expect(
        saga.next({ data: { success: false, error: "123" } }).value
      ).toEqual(put(fetchAuthFailure({ error: "123" })));
    });

    it("saga is finished", () => {
      expect(saga.next().done).toEqual(true);
    });
  });
  describe("Сценарий c сетевой ошибкой", () => {
    const action = { payload: { email: "test@gmail.com", password: "123" } };
    const saga = fetchAuthFlow(action);
    const error = new Error("test error");
    saga.next();

    it("dispatch action fetchAuthFailure from call on error call", () => {
      expect(saga.throw(error).value).toEqual(
        put(fetchAuthFailure({ error: "test error" }))
      );
    });
  });
});

describe("Сага fetchLogoutFlow", () => {
  describe("Сценарий c успешной выходом", () => {
    const saga = fetchLogoutFlow();
    it("calls removeAuthDataInLocalStorage", () => {
      expect(saga.next().value).toEqual(call(removeAuthDataInLocalStorage));
    });
  });

  describe("Сценарий c не успешной выходом", () => {
    const saga = fetchLogoutFlow();
    const error = new Error("test error");
    saga.next();

    it("dispatch action fetchAuthFailure from call on error call", () => {
      expect(saga.throw(error).value).toEqual(
        put(fetchAuthFailure({ error: "test error" }))
      );
    });
  });
});
