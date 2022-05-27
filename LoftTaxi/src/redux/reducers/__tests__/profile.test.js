import profile from "../profile";
import {
  fetchUserProfileRequest,
  fetchUserProfileSuccess,
} from "../../actions/profile";

describe("Редьюсер profile", () => {
  it("Экшен с типом fetchUserProfileRequest очищает userProfile", () => {
    const next = profile(
      {
        userProfile: {
          userName: "AS SD",
          cardNumber: "1234123412341234",
          cardDate: "12/2024",
          cardCVV: "223",
        },
      },
      { type: fetchUserProfileRequest }
    );

    expect(next.userProfile).toBeNull();
  });

  it("Экшен с типом fetchUserProfileSuccess устанавливает новые данные для userProfile", () => {
    const next = profile(
      { userProfile: null },
      {
        type: fetchUserProfileSuccess,
        payload: {
          userName: "AS SD",
          cardNumber: "1234123412341234",
          cardDate: "12/2024",
          cardCVV: "223",
        },
      }
    );

    expect(next.userProfile).toStrictEqual({
      userName: "AS SD",
      cardNumber: "1234123412341234",
      cardDate: "12/2024",
      cardCVV: "223",
    });
  });
});
