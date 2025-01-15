import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../../../components/page";

describe("Page", () => {
  it("renders children", () => {
    render(
      <Page>
        <div>Test child</div>
      </Page>
    );
    expect(screen.getByText("Test child")).toBeInTheDocument();
  });
});
