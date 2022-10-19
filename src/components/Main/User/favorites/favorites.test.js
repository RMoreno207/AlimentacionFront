import React from "react";
import { shallow } from "enzyme";
import Favorites from "./favorites";

describe("Favorites", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Favorites />);
    expect(wrapper).toMatchSnapshot();
  });
});
