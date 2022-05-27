import React from "react";
import OrderCardStyled from "../OrderCard/OrderCard";
import OrderFormStyled from "../OrderCard/OrderForm";
import OrderAlert from "../OrderCard/OrderAlert";
import { mount } from "enzyme";

describe("Рендер", () => {
  const wrapper = mount(
    <OrderCardStyled
      addressListError={null}
      coordsError={null}
      coordsIsLoaded={false}
    />
  );

  it("Присутствует сообщения об ошибке загрузки адресов при addressListError === true", () => {
    wrapper.setProps({
      ...wrapper.props(),
      addressListError: true,
    });

    expect(
      wrapper.findWhere((el) => {
        const matchPropChildren =
          el.name() === "Modal" &&
          el.props().text === "Не удалось загрузить адреса";

        return matchPropChildren;
      })
    ).toHaveLength(1);
  });
  it("Присутствует сообщения об ошибке загрузки координат при coordsError === true", () => {
    wrapper.setProps({
      ...wrapper.props(),
      coordsError: true,
    });

    expect(
      wrapper.findWhere((el) => {
        const matchPropChildren =
          el.name() === "Modal" &&
          el.props().text === "Не удалось загрузить маршрут";

        return matchPropChildren;
      })
    ).toHaveLength(1);
  });
  it("Присутствует форма выбора точек маршрута при coordsIsLoaded === false", () => {
    expect(wrapper.find(OrderFormStyled)).toHaveLength(1);
  });
  it("Присутствует форма оповещения успешно созданного заказа при coordsIsLoaded === true", () => {
    wrapper.setProps({
      ...wrapper.props(),
      coordsIsLoaded: true,
    });
    expect(wrapper.find(OrderAlert)).toHaveLength(1);
  });
});
