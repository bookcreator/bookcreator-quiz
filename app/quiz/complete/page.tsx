"use client";

import { useContext, useState } from "react";
import { QuizContext } from "../../../context/quiz";
import styles from "./page.module.css";
import { SortType } from "@/types/quiz";
import Dropdown from "@/components/dropdown";
import LeaderboardTable from "@/components/leaderboard-table";
import Pagination from "@/components/pagination";
import UserScore from "@/components/user-score";
import useLeaderboard from "@/hooks/useLeaderboard";
import Input from "@/components/input";

export default function QuizComplete() {
  const { userName, userScore, skillScore, scoreId } = useContext(QuizContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(20);
  const [sortType, setSortType] = useState<SortType>("Score");
  const [filterText, setFilterText] = useState("");

  const { result, failed } = useLeaderboard(
    currentPage,
    resultsPerPage,
    sortType
  );

  if (!result) return null;

  let { leaderboard, totalPages } = result;

  if (userScore && skillScore && userName) {
    const userEntry = {
      id: scoreId,
      name: userName,
      score: userScore + skillScore,
      added: true,
    };

    const existingEntryIndex = leaderboard.findIndex(
      (entry) => entry.id === scoreId
    );

    if (existingEntryIndex === -1) {
      if (sortType === "Name") {
        leaderboard = [...leaderboard, userEntry].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else if (sortType === "Score") {
        leaderboard = [...leaderboard, userEntry].sort(
          (a, b) => b.score - a.score
        );
      }
    }
  }

  const filteredLeaderboard = leaderboard.filter((user) =>
    user.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setResultsPerPage(Number(event.target.value));
  };

  const handleSortTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortType(event.target.value as SortType);
  };

  const handleFilterTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterText(event.target.value);
  };

  // Full text search is relatively simple to set up when not using SQLite for Prisma
  // However, since SQLite is so much easier for the development scope I've decided to omit it for this project
  // https://www.prisma.io/docs/orm/prisma-client/queries/full-text-search
  // A more basic filter that only filters on names returned after pagination is provided for example

  if (failed) {
    return <p>Failed to load leaderboard</p>;
  }

  return (
    <div className={styles.container}>
      {userScore ? (
        <UserScore
          userName={userName}
          userScore={userScore}
          skillScore={skillScore}
        />
      ) : null}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />
      <div className={styles.options}>
        <Dropdown
          onChange={handlePageSizeChange}
          defaultValue={resultsPerPage}
          values={[10, 20, 50, 100]}
        />
        <Dropdown
          onChange={handleSortTypeChange}
          defaultValue={sortType}
          values={["Name", "Score"]}
        />
        <Input
          text={filterText}
          handleTextChange={handleFilterTextChange}
          placeholder="Filter by name"
        />
      </div>
      <LeaderboardTable
        leaderboard={filteredLeaderboard}
        sortType={sortType}
        startIndex={(currentPage - 1) * resultsPerPage}
        pageSize={resultsPerPage}
        scoreId={scoreId}
      />
    </div>
  );
}
