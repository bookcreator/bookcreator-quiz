import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Content from "../../../components/content";

describe("Content", () => {
  it("renders children", () => {
    render(
      <Content>
        <div>Test child</div>
      </Content>
    );
    expect(screen.getByText("Test child")).toBeInTheDocument();
  });
});
