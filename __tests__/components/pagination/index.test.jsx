import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "../../../components/pagination";

describe("Pagination", () => {
  test("renders pagination component", () => {
    render(<Pagination />);
    const paginationElement = screen.getByTestId("pagination");
    expect(paginationElement).toBeInTheDocument();
  });

  test("enables next button when not on the last page", () => {
    render(<Pagination currentPage={1} totalPages={5} />);
    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeEnabled();
  });

  test("disables previous button on the first page", () => {
    render(<Pagination currentPage={1} totalPages={5} />);
    const prevButton = screen.getByText("Previous");
    expect(prevButton).toBeDisabled();
  });

  test("enables previous button when on the last page", () => {
    render(<Pagination currentPage={5} totalPages={5} />);
    const nextButton = screen.getByText("Previous");
    expect(nextButton).toBeEnabled();
  });

  test("disables next button on the last page", () => {
    render(<Pagination currentPage={5} totalPages={5} />);
    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });
});
