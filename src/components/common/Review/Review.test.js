import React from "react";
import { shallow } from "enzyme";
import Review from "./Review";

describe("Review", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Review />);
    expect(wrapper).toMatchSnapshot();
  });
});
