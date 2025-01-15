import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "../../../components/header";

describe("Header", () => {
  it("renders the logo", () => {
    render(<Header />);
    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });

  it("renders no title by default", () => {
    render(<Header />);
    expect(screen.queryByTestId("title")).toEqual(null);
  });

  it("renders no subtitle by default", () => {
    render(<Header />);
    expect(screen.queryByTestId("subtitle")).toEqual(null);
  });

  it("renders title when passed", () => {
    render(<Header title="Test title" />);
    expect(screen.getByText("Test title")).toBeInTheDocument();
    expect(screen.queryByTestId("subtitle")).toEqual(null);
  });

  it("renders title and subtitle when passed", () => {
    render(<Header title="Test title" subtitle="Test subtitle" />);
    expect(screen.getByText("Test title")).toBeInTheDocument();
    expect(screen.getByText("Test subtitle")).toBeInTheDocument();
  });

  it("renders no subtitle if title not passed", () => {
    render(<Header subtitle="Test subtitle" />);
    expect(screen.queryByTestId("subtitle")).toEqual(null);
  });
});
