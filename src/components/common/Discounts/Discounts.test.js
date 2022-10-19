import React from "react";
import { shallow } from "enzyme";
import Discounts from "./Discounts";

describe("Discounts", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Discounts />);
    expect(wrapper).toMatchSnapshot();
  });
});
