import React from "react";
import OrderFormStyled from "../OrderCard/OrderForm";
import { mount } from "enzyme";

describe("Рендер", () => {
  const wrapper = mount(
    <OrderFormStyled
      isCoordsLoading={false}
    />
  );
  it("Присутствует поле для ввода пункта отправления", () => {
    expect(
      wrapper.findWhere((el) => {
        const matchPropChildren =
          el.name() === "ForwardRef(Field)" && el.props().name === "address1";

        return matchPropChildren;
      })
    ).toHaveLength(1);
  });
  it("Присутствует поле для ввода пункта назначения", () => {
    expect(
      wrapper.findWhere((el) => {
        const matchPropChildren =
          el.name() === "ForwardRef(Field)" && el.props().name === "address2";

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
  it("Присутствует лоадер при isCoordsLoading === true", () => {
    wrapper.setProps({
      ...wrapper.props(),
      isCoordsLoading: true,
    });

    expect(
      wrapper.findWhere((el) => {
        const matchPropChildren = el.name() === "ForwardRef(CircularProgress)";

        return matchPropChildren;
      })
    ).toHaveLength(1);
  });
});
