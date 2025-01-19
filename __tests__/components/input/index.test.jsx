import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "../../../components/input";

describe("Input", () => {
  it("renders the input element", () => {
    render(<Input />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  it("handles input changes", () => {
    render(<Input />);
    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "test" } });
    expect(inputElement.value).toBe("test");
  });

  it("calls the onChange handler", () => {
    const handleFilterTextChange = jest.fn();
    render(
      <Input text="" handleTextChange={handleFilterTextChange} placeholder="" />
    );
    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "test" } });
    expect(handleFilterTextChange).toHaveBeenCalledTimes(1);
  });
});
