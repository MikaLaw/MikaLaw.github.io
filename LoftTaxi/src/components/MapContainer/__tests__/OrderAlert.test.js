import React from "react";
import OrderAlert from "../OrderCard/OrderAlert";
import { mount } from "enzyme";

describe("Рендер", () => {
  const wrapper = mount(<OrderAlert getNewOrder={() => {}} />);
  it("Присутствует поле кнопка отправки данных", () => {
    expect(
      wrapper.findWhere((el) => {
        const matchPropChildren =
          el.name() === "button" && el.props().type === "submit";

        return matchPropChildren;
      })
    ).toHaveLength(1);
  });
});
