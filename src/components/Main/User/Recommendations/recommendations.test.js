import React from "react";
import { shallow } from "enzyme";
import Recommendations from "./recommendations";

describe("Recommendations", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Recommendations />);
    expect(wrapper).toMatchSnapshot();
  });
});
