import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Answers from "../../../../components/quiz/answers";

const answerQuestionMock = jest.fn();

describe("Answers", () => {
  it("renders the answers", () => {
    render(
      <Answers
        answers={["Answer 1", "Answer 2"]}
        questionNumber={1}
        userAnswers={{}}
      />
    );
    expect(screen.getByText("Answer 1")).toBeInTheDocument();
    expect(screen.getByText("Answer 2")).toBeInTheDocument();
  });
});
