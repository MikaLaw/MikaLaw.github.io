import auth from "../auth";
import {
  fetchAuthRequest,
  fetchAuthSuccess,
  fetchAuthFailure,
  logout,
} from "../../actions/auth";

describe("Редьюсер user", () => {
  it("Экшен с типом fetchAuthRequest изменяет значение isLoading на true", () => {
    const next = auth({ isLoading: false }, { type: fetchAuthRequest });

    expect(next.isLoading).toBeTruthy();
  });

  it("Экшен с типом fetchAuthSuccess изменяет значение isLoading на false", () => {
    const next = auth({ isLoading: true }, { type: fetchAuthSuccess });

    expect(next.isLoading).toBeFalsy();
  });

  it("Экшен с типом fetchAuthFailure изменяет значение isLoading на false", () => {
    const next = auth(
      { isLoading: true, error: null },
      { type: fetchAuthFailure, payload: { error: new Error() } }
    );

    expect(next.isLoading).toBeFalsy();
  });

  it("Экшен с типом fetchAuthRequest изменяет значение  isAuthorized на false", () => {
    const next = auth({ isAuthorized: true }, { type: fetchAuthRequest });

    expect(next.isAuthorized).toBeFalsy();
  });

  it("Экшен с типом fetchAuthSuccess  изменяет значение  isAuthorized на true", () => {
    const next = auth({ isAuthorized: false }, { type: fetchAuthSuccess });

    expect(next.isAuthorized).toBeTruthy();
  });

  it("Экшен с типом fetchAuthRequest очищает error", () => {
    const next = auth({ error: new Error() }, { type: fetchAuthRequest });

    expect(next.error).toBeNull();
  });

  it("Экшен с типом fetchAuthSuccess очищает error", () => {
    const next = auth(
      { isLoading: true, isAuthorized: false, error: new Error() },
      { type: fetchAuthSuccess }
    );

    expect(next.error).toBeNull();
  });

  it("Экшен с типом fetchAuthFailure устанавливает новые данные для error", () => {
    const next = auth(
      { isLoading: true, isAuthorized: false, error: null },
      { type: fetchAuthFailure, payload: { error: "test" } }
    );

    expect(next.error).toBe("test");
  });

  it("Экшен с типом logout изменяет значение isLoading на false", () => {
    const next = auth({ isLoading: true }, { type: logout });

    expect(next.isLoading).toBeFalsy();
  });

  it("Экшен с типом logout изменяет значение  isAuthorized на false", () => {
    const next = auth({ isAuthorized: true }, { type: logout });

    expect(next.isAuthorized).toBeFalsy();
  });
});
