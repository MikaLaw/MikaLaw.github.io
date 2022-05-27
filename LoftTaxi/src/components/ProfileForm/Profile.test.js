import React, { cloneElement } from "react";
import { ProfileFormStyled } from "./ProfileForm";
import { mount } from "enzyme";

describe("Рендер", () => {
  const wrapper = mount(<ProfileFormStyled />);
  it("Присутствует поле для ввода имени", () => {
    expect(
      wrapper.findWhere((el) => {
        const matchPropChildren =
          el.name() === "ForwardRef(Field)" && el.props().name === "userName";

        return matchPropChildren;
      })
    ).toHaveLength(1);
  });
  it("Присутствует поле для ввода номера карты", () => {
    expect(
      wrapper.findWhere((el) => {
        const matchPropChildren =
          el.name() === "ForwardRef(Field)" && el.props().name === "cardNumber";

        return matchPropChildren;
      })
    ).toHaveLength(1);
  });
  it("Присутствует поле для ввода даты окончания срока действия карты", () => {
    expect(
      wrapper.findWhere((el) => {
        const matchPropChildren =
          el.name() === "ForwardRef(Field)" && el.props().name === "cardDate";

        return matchPropChildren;
      })
    ).toHaveLength(1);
  });
  it("Присутствует поле для ввода cvv", () => {
    expect(
      wrapper.findWhere((el) => {
        const matchPropChildren =
          el.name() === "ForwardRef(Field)" && el.props().name === "cardCVV";

        return matchPropChildren;
      })
    ).toHaveLength(1);
  });
  it("Присутствует поле кнопка отправки данных", () => {
    expect(
      wrapper.findWhere((el) => {
        const matchPropChildren =
          el.name() === "button" && el.props().type === "submit";

        return matchPropChildren;
      })
    ).toHaveLength(1);
  });
  it("Присутствует сообщение об успешном сохранении при state.showModal === true", () => {
    const ProfileForm = wrapper.find("ProfileForm");

    ProfileForm.setState({
      ...ProfileForm.state(),
      showModal: true,
    });

    expect(
      wrapper.findWhere((el) => {
        const matchPropChildren = el.name() === "Modal";

        return matchPropChildren;
      })
    ).toHaveLength(1);
  });
});
