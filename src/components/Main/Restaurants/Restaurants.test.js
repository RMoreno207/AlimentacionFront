import React from "react";
import { shallow } from "enzyme";
import Restaurants from "./Restaurants";

describe("Restaurants", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Restaurants />);
    expect(wrapper).toMatchSnapshot();
  });
});
