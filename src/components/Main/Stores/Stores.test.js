import React from "react";
import { shallow } from "enzyme";
import Stores from "./Stores";

describe("Stores", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Stores />);
    expect(wrapper).toMatchSnapshot();
  });
});
