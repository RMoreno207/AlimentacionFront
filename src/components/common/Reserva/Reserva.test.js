import React from "react";
import { shallow } from "enzyme";
import Reserva from "./Reserva";

describe("Reserva", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Reserva />);
    expect(wrapper).toMatchSnapshot();
  });
});
