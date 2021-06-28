import React from "react";
import { shallow } from "enzyme";
import { Wrapper } from "../Wrapper";

describe("Layout", () => {
  it("Basic small Wrapper renders", () => {
    const layout = shallow(<Wrapper variant="small" />);
    expect(layout.getElements()).toMatchSnapshot();
  });

  it("Basic regular Wrapper renders", () => {
    const layout = shallow(<Wrapper variant="regular" />);
    expect(layout.getElements()).toMatchSnapshot();
  });
});
