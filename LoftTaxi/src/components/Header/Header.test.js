import React, { cloneElement } from "react";
import { HeaderStyled as Header } from "./Header";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";

describe("Рендер", () => {
  const wrapper = mount(
    <MemoryRouter>
      <Header isAuthorized={false} />
    </MemoryRouter>
  );
  it("Присутствует пункт меню 'Карта'", () => {
    expect(
      wrapper.findWhere((el) => {
        const matchPropChildren =
          el.name() === "NavLink" &&
          el.props().to === "/map" &&
          el.props().children.props.children === "Карта";

        return matchPropChildren;
      })
    ).toHaveLength(1);
  });
  it("Присутствует пункт меню 'Профиль'", () => {
    expect(
      wrapper.findWhere((el) => {
        const matchPropChildren =
          el.name() === "NavLink" &&
          el.props().to === "/profile" &&
          el.props().children.props.children === "Профиль";

        return matchPropChildren;
      })
    ).toHaveLength(1);
  });
  it("Присутствует пункт меню 'Войти', при isAuthorized === false", () => {
    expect(
      wrapper.findWhere((el) => {
        const matchPropChildren =
          el.name() === "NavLink" &&
          el.props().to === "/login" &&
          el.props().children.props.children === "Войти";

        return matchPropChildren;
      })
    ).toHaveLength(1);
  });
  it("Присутствует пункт меню 'Выйти', при isAuthorized === true", () => {
    wrapper.setProps({
      children: cloneElement(wrapper.props().children, { isAuthorized: true }),
    });

    expect(
      wrapper.findWhere((el) => {
        const matchPropChildren =
          el.name() === "NavLink" &&
          el.props().to === "/login" &&
          el.props().children.props.children === "Выйти";

        return matchPropChildren;
      })
    ).toHaveLength(1);
  });
});
