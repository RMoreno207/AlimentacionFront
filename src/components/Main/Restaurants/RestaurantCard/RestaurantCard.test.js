import React from "react";
import { shallow } from "enzyme";
import RestaurantCard from "./RestaurantCard";

describe("RestaurantCard", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<RestaurantCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
