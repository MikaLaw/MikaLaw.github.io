import React from "react";
import { LoginStyled as LoginForm } from "./LoginForm";
import { mount } from "enzyme";
import { fetchAuthRequest } from "../../redux/actions/auth";

describe("Рендер", () => {
  const wrapper = mount(<LoginForm isLoading={false} error={false} />);
  it("Присутствует поле для ввода логина", () => {
    expect(
      wrapper.findWhere((el) => {
        const matchPropChildren =
          el.name() === "ForwardRef(TextField)" && el.props().name === "email";

        return matchPropChildren;
      })
    ).toHaveLength(1);
  });
  it("Присутствует поле для ввода пароля", () => {
    expect(
      wrapper.findWhere((el) => {
        const matchPropChildren =
          el.name() === "ForwardRef(TextField)" &&
          el.props().name === "password";

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
  it("Присутствует лоадер при isLoading === true", () => {
    wrapper.setProps({
      ...wrapper.props(),
      isLoading: true,
    });

    expect(
      wrapper.findWhere((el) => {
        const matchPropChildren = el.name() === "ForwardRef(CircularProgress)";

        return matchPropChildren;
      })
    ).toHaveLength(1);
  });
  it("Присутствует сообщение об ошибке при error === true", () => {
    wrapper.setProps({
      ...wrapper.props(),
      error: true,
    });

    expect(
      wrapper.findWhere((el) => {
        const matchPropChildren = el.name() === "Modal";

        return matchPropChildren;
      })
    ).toHaveLength(1);
  });
});
