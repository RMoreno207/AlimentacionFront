import React from "react";
import { shallow } from "enzyme";
import Recommendations2 from "./Recommendations2";

describe("Recommendations2", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Recommendations2 />);
    expect(wrapper).toMatchSnapshot();
  });
});
