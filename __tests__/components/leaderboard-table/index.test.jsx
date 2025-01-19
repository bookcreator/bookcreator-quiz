import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LeaderboardTable from "../../../components/leaderboard-table";

describe("Leaderboard Table", () => {
  const leaderboard = [
    { id: "1", name: "Alice", score: 80 },
    { id: "2", name: "Bob", score: 90 },
    { id: "3", name: "Eve", score: 100, added: true },
  ];

  it("renders the leaderboard table with correct headers", () => {
    render(
      <LeaderboardTable
        leaderboard={leaderboard}
        sortType="Name"
        startIndex={0}
        pageSize={3}
      />
    );
    expect(screen.getByText("Rank")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Score")).toBeInTheDocument();
  });

  it("renders the leaderboard entries correctly", () => {
    render(
      <LeaderboardTable
        leaderboard={leaderboard}
        sortType="Name"
        startIndex={0}
        pageSize={3}
      />
    );
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Eve")).toBeInTheDocument();
  });

  it("highlights the active score entry", () => {
    render(
      <LeaderboardTable
        leaderboard={leaderboard}
        sortType="Name"
        startIndex={0}
        pageSize={3}
        scoreId="3"
      />
    );
    expect(screen.getByText("Eve").closest("tr")).toHaveClass("active");
  });

  it("displays the added entry correctly", () => {
    render(
      <LeaderboardTable
        leaderboard={leaderboard}
        sortType="Name"
        startIndex={0}
        pageSize={3}
      />
    );
    expect(screen.getByText("Eve")).toBeInTheDocument();
  });
});
