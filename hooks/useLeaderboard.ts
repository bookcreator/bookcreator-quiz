import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { QuizResult, SortType } from "@/types/quiz";

const useLeaderboard = (
  currentPage: number,
  resultsPerPage: number,
  sortType: SortType
) => {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<QuizResult>();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const loadResults = async (
      page: number,
      resultsPerPage: number,
      sortType: SortType
    ) => {
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
        const result = await res.json();
        setResult(result);
      } catch (e) {
        setFailed(true);
        console.error(e);
      }
    };
    loadResults(currentPage, resultsPerPage, sortType);
  }, [currentPage, resultsPerPage, sortType, searchParams]);

  return { result, failed };
};

export default useLeaderboard;
