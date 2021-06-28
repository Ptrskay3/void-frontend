import React from "react";
import { shallow } from "enzyme";
import UpdootSection from "../UpdootSection";
import { Provider } from "urql";
import { never } from "wonka";

describe("Layout", () => {
  it("Updoot section loads with post", () => {
    const mockClient = {
      executeQuery: jest.fn(() => never),
      executeMutation: jest.fn(() => never),
      executeSubscription: jest.fn(() => never),
    };

    const post = {
      points: 1,
      id: 345,
      title: "szia",
      createdAt: "1615645506657",
      updatedAt: "1615645506657",
      textSnippet: "",
      voteStatus: 1,
      creator: {
        username: "ben",
        id: 2,
      },
    };

    const updootSection = shallow(
      <Provider value={mockClient}>
        <UpdootSection post={post} />
      </Provider>
    );

    const foundPost = updootSection.find("post");
    expect(foundPost).toBeDefined();

    expect(updootSection.getElements()).toMatchSnapshot();
  });
});
