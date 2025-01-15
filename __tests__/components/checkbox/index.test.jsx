import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Checkbox from "../../../components/checkbox";

const onClickMock = jest.fn();

describe("Button", () => {
  it("renders no tick icon when unchecked", () => {
    render(<Checkbox />);
    expect(screen.queryByTestId('svg-icon')).toEqual(null);
  });
  it("renders tick icon when checked", () => {
    render(<Checkbox checked />);
    expect(screen.queryByTestId('svg-icon')).not.toEqual(null);
  });
});
