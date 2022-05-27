import coords from "../coords";
import {
  fetchCoordsRequest,
  fetchCoordsSuccess,
  fetchCoordsFailure,
  fetchNewRoudRequest,
} from "../../actions/coords";

describe("Редьюсер address", () => {
  it("Экшен с типом fetchCoordsRequest изменяет значение isLoading на true", () => {
    const next = coords({ isLoading: false }, { type: fetchCoordsRequest });

    expect(next.isLoading).toBeTruthy();
  });

  it("Экшен с типом fetchCoordsSuccess изменяет значение isLoading на false", () => {
    const next = coords(
      { isLoading: true },
      {
        type: fetchCoordsSuccess,
        payload: {
          data: [
            [30.272182, 59.800652],
            [30.274046, 59.800365],
          ],
        },
      }
    );

    expect(next.isLoading).toBeFalsy();
  });

  it("Экшен с типом fetchCoordsFailure изменяет значение isLoading на false", () => {
    const next = coords(
      { isLoading: true, error: null },
      { type: fetchCoordsFailure, payload: { error: new Error() } }
    );

    expect(next.isLoading).toBeFalsy();
  });

  it("Экшен с типом fetchCoordsRequest изменяет значение isLoaded на false", () => {
    const next = coords({ isLoaded: true }, { type: fetchCoordsRequest });

    expect(next.isLoaded).toBeFalsy();
  });

  it("Экшен с типом fetchCoordsSuccess изменяет значение isLoaded на true", () => {
    const next = coords(
      { isLoaded: false },
      {
        type: fetchCoordsSuccess,
        payload: {
          data: [
            [30.272182, 59.800652],
            [30.274046, 59.800365],
          ],
        },
      }
    );

    expect(next.isLoaded).toBeTruthy();
  });

  it("Экшен с типом fetchCoordsFailure изменяет значение isLoaded на false", () => {
    const next = coords(
      { isLoaded: true, error: null },
      { type: fetchCoordsFailure, payload: { error: new Error() } }
    );

    expect(next.isLoaded).toBeFalsy();
  });

  it("Экшен с типом fetchNewRoudRequest изменяет значение isLoaded на false", () => {
    const next = coords(
      { isLoaded: true, error: null },
      { type: fetchNewRoudRequest }
    );

    expect(next.isLoaded).toBeFalsy();
  });

  it("Экшен с типом fetchCoordsRequest очищает coords", () => {
    const next = coords(
      {
        coords: [
          [30.272182, 59.800652],
          [30.274046, 59.800365],
        ],
      },
      { type: fetchCoordsRequest }
    );

    expect(next.coords).toStrictEqual([]);
  });

  it("Экшен с типом fetchCoordsSuccess устанавливает новые данные для coords", () => {
    const next = coords(
      { isLoading: true, coords: [] },
      {
        type: fetchCoordsSuccess,
        payload: {
          data: [
            [30.272182, 59.800652],
            [30.274046, 59.800365],
          ],
        },
      }
    );

    expect(next.coords).toStrictEqual([
      [30.272182, 59.800652],
      [30.274046, 59.800365],
    ]);
  });

  it("Экшен с типом fetchNewRoudRequest очищает coords", () => {
    const next = coords(
      {
        coords: [
          [30.272182, 59.800652],
          [30.274046, 59.800365],
        ],
      },
      {
        type: fetchNewRoudRequest,
      }
    );

    expect(next.coords).toStrictEqual([]);
  });

  it("Экшен с типом fetchCoordsRequest очищает error", () => {
    const next = coords({ error: new Error() }, { type: fetchCoordsRequest });

    expect(next.error).toBeNull();
  });

  it("Экшен с типом fetchCoordsSuccess очищает error", () => {
    const next = coords(
      { isLoading: true, coords: [], error: new Error() },
      {
        type: fetchCoordsSuccess,
        payload: {
          data: [
            [30.272182, 59.800652],
            [30.274046, 59.800365],
          ],
        },
      }
    );

    expect(next.error).toBeNull();
  });

  it("Экшен с типом fetchCoordsFailure устанавливает новые данные для error", () => {
    const next = coords(
      { isLoading: true, coords: [], error: null },
      { type: fetchCoordsFailure, payload: { error: "test" } }
    );

    expect(next.error).toBe("test");
  });
});
