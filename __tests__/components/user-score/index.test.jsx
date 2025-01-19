import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserScore from "../../../components/user-score";

describe("User Score", () => {
  it("renders the correct user score message", () => {
    render(<UserScore userName="Alice" userScore={3} skillScore={5} />);
    const userScoreBody = screen.getByTestId("user-score-body");
    expect(userScoreBody).toBeInTheDocument();
    expect(userScoreBody).toHaveTextContent(
      "🎉 Alice, you answered 3 questions correctly and gained a skill score of 5, giving you a total score of 8 🎉"
    );
  });

  it("renders the correct message for a single correct answer", () => {
    render(<UserScore userName="Bob" userScore={1} skillScore={2} />);
    const userScoreBody = screen.getByTestId("user-score-body");
    expect(userScoreBody).toBeInTheDocument();
    expect(userScoreBody).toHaveTextContent(
      "🎉 Bob, you answered 1 question correctly and gained a skill score of 2, giving you a total score of 3 🎉"
    );
  });

  it("renders the share link with the correct score", () => {
    render(<UserScore userName="Eve" userScore={2} skillScore={6} />);
    const shareLink = screen.getByRole("link", {
      name: /Share your score! 🐦/,
    });
    expect(shareLink).toHaveAttribute(
      "href",
      "https://twitter.com/intent/tweet?text=I%20scored%208%20on%20the%20Book%20Creator%20Quiz!"
    );
  });
});
