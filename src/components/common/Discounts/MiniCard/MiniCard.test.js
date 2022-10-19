import React from "react";
import { shallow } from "enzyme";
import MiniCard from "./MiniCard";

describe("MiniCard", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MiniCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
