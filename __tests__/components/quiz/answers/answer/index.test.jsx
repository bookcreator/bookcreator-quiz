import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Answer from "../../../../../components/quiz/answers/answer";

const onAnswerMock = jest.fn();

describe("Answer", () => {
  it("renders the answer text", () => {
    render(<Answer answer="Test answer 123" />);
    expect(screen.getByText("Test answer 123")).toBeInTheDocument();
  });
});
