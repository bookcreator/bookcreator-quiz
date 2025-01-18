"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { QuizContext } from "../../../context/quiz";
import styles from "./page.module.css";
import { QuizResult, SortType } from "@/types/quiz";
import Button from "@/components/button";
import Dropdown from "@/components/dropdown";

export default function QuizComplete() {
  const { userName, userScore, skillScore } = useContext(QuizContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [result, setResult] = useState<QuizResult>();
  const [_, setFailed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(20);
  const [sortType, setSortType] = useState<SortType>("Score");

  useEffect(() => {
    const loadResults = async (page: number, resultsPerPage: number) => {
      try {
        const res = await fetch("/api/leaderboard", {
          method: "POST",
          body: JSON.stringify({
            page,
            resultsPerPage,
            sortType,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        setResult(await res.json());
      } catch (e) {
        setFailed(true);
        console.error(e);
      }
    };
    loadResults(currentPage, resultsPerPage);
  }, [router, currentPage, resultsPerPage, searchParams, sortType]);

  if (!result) return null;

  const { leaderboard, totalPages } = result;

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

  const startIndex = (currentPage - 1) * resultsPerPage;

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

  return (
    <div className={styles.container}>
      {userScore ? (
        <>
          <p className={styles.score}>
            🎉 <strong>{userName}</strong>, you answered{" "}
            <strong>{userScore}</strong> question
            {userScore === 1 ? "" : "s"} correctly and gained a skill score of{" "}
            <strong>{skillScore}</strong>, giving you a total score of{" "}
            <strong>{userScore + skillScore}</strong> 🎉
          </p>
          <strong>
            <a
              className={styles.share}
              href={`https://twitter.com/intent/tweet?text=I%20scored%20${
                userScore + skillScore
              }%20on%20the%20Book%20Creator%20Quiz!`}
              data-size="large"
            >
              Share your score! 🐦
            </a>
          </strong>
        </>
      ) : null}
      <div className={styles.pagination}>
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
      <div className={styles.options}>
        <Dropdown
          onChange={handlePageSizeChange}
          defaultValue={resultsPerPage}
          values={[10, 20, 50, 100]}
        />
        <Dropdown
          onChange={handleSortTypeChange}
          defaultValue={sortType}
          values={["Score", "Name"]}
        />
      </div>
      <table className={styles.leaderboard}>
        <thead>
          <tr>
            <th className={styles.rank}>Rank</th>
            <th className={styles.name}>Name</th>
            <th className={styles.score}>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={index}>
              <td className={styles.rank}>{startIndex + index + 1}</td>
              <td className={styles.name}>{entry.name}</td>
              <td className={styles.score}>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
