import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dropdown from "../../../components/dropdown";
import { useState } from "react";

describe("Dropdown", () => {
  it("renders dropdown component", () => {
    const values = ["Option 1", "Option 2", "Option 3"];
    const defaultValue = "Option 1";
    render(
      <Dropdown
        values={values}
        defaultValue={defaultValue}
        onChange={() => {}}
      />
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("opens the dropdown menu when clicked", () => {
    const values = ["Option 1", "Option 2", "Option 3"];
    const defaultValue = "Option 1";
    render(
      <Dropdown
        values={values}
        defaultValue={defaultValue}
        onChange={() => {}}
      />
    );
    const dropdown = screen.getByRole("combobox");
    fireEvent.click(dropdown);
    expect(
      screen.getByRole("option", { name: "Option 1" })
    ).toBeInTheDocument();
  });

  it("selects an option when clicked", () => {
    const values = ["Option 1", "Option 2", "Option 3"];
    const defaultValue = "Option 1";
    const TestComponent = () => {
      const [selectedValue, setSelectedValue] = useState(defaultValue);
      return (
        <Dropdown
          values={values}
          defaultValue={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
        />
      );
    };
    render(<TestComponent />);
    const dropdown = screen.getByRole("combobox");
    fireEvent.change(dropdown, { target: { value: "Option 2" } });
    expect(dropdown).toHaveValue("Option 2");
  });
});
