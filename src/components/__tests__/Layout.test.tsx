import React from "react";
import { shallow } from "enzyme";
import { Layout } from "../Layout";

describe("Layout", () => {
  it("Basic small Layout renders", () => {
    const layout = shallow(<Layout variant="small" />);
    expect(layout.getElements()).toMatchSnapshot();
  });

  it("Basic regular Layout renders", () => {
    const layout = shallow(<Layout variant="regular" />);
    expect(layout.getElements()).toMatchSnapshot();
  });
});
