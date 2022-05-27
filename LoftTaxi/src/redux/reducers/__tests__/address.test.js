import address from "../address";
import {
  fetchAddressListRequest,
  fetchAddressListSuccess,
  fetchAddressListFailure,
} from "../../actions/address";

describe("Редьюсер address", () => {
  it("Экшен с типом fetchAddressListRequest изменяет значение isLoading на true", () => {
    const next = address(
      { isLoading: false },
      { type: fetchAddressListRequest }
    );

    expect(next.isLoading).toBeTruthy();
  });

  it("Экшен с типом fetchAddressListSuccess изменяет значение isLoading на false", () => {
    const next = address(
      { isLoading: true },
      {
        type: fetchAddressListSuccess,
        payload: {
          addresses: [
            "Пулково (LED)",
            "Эрмитаж",
            "Кинотеатр Аврора",
            "Мариинский театр",
          ],
        },
      }
    );

    expect(next.isLoading).toBeFalsy();
  });

  it("Экшен с типом fetchAddressListFailure изменяет значение isLoading на false", () => {
    const next = address(
      { isLoading: true, error: null },
      { type: fetchAddressListFailure, payload: { error: new Error() } }
    );

    expect(next.isLoading).toBeFalsy();
  });

  it("Экшен с типом fetchAddressListRequest очищает addressList", () => {
    const next = address(
      {
        addressList: [
          "Пулково (LED)",
          "Эрмитаж",
          "Кинотеатр Аврора",
          "Мариинский театр",
        ],
      },
      { type: fetchAddressListRequest }
    );

    expect(next.addressList).toStrictEqual([]);
  });

  it("Экшен с типом fetchAddressListSuccess устанавливает новые данные для addressList", () => {
    const next = address(
      { isLoading: true, addressList: [] },
      {
        type: fetchAddressListSuccess,
        payload: {
          addresses: [
            "Пулково (LED)",
            "Эрмитаж",
            "Кинотеатр Аврора",
            "Мариинский театр",
          ],
        },
      }
    );

    expect(next.addressList).toStrictEqual([
      "Пулково (LED)",
      "Эрмитаж",
      "Кинотеатр Аврора",
      "Мариинский театр",
    ]);
  });

  it("Экшен с типом fetchAddressListRequest очищает error", () => {
    const next = address(
      { error: new Error() },
      { type: fetchAddressListRequest }
    );

    expect(next.error).toBeNull();
  });

  it("Экшен с типом fetchAddressListSuccess очищает error", () => {
    const next = address(
      { isLoading: true, addressList: [], error: new Error() },
      {
        type: fetchAddressListSuccess,
        payload: {
          addresses: [
            "Пулково (LED)",
            "Эрмитаж",
            "Кинотеатр Аврора",
            "Мариинский театр",
          ],
        },
      }
    );

    expect(next.error).toBeNull();
  });

  it("Экшен с типом fetchAddressListFailure устанавливает новые данные для error", () => {
    const next = address(
      { isLoading: true, addressList: [], error: null },
      { type: fetchAddressListFailure, payload: { error: "test" } }
    );

    expect(next.error).toBe("test");
  });
});
