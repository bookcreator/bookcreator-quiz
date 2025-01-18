"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QuizContext } from "../../../context/quiz";
import styles from "./page.module.css";
import { QuizResult } from "@/types/quiz";
import UserResult from "@/components/quiz/userResult";
import PlayersResult from "@/components/quiz/playersList";

export default function QuizComplete() {
  const { userAnswers, questions, userName } = useContext(QuizContext);
  const router = useRouter();
  const [result, setResult] = useState<QuizResult>();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (Object.keys(userAnswers).length === 0) {
      console.log("No answers found");
      router.push("/");
      return;
    }
    const loadResults = async () => {
      try {
        const res = await fetch("/api/submit", {
          method: "POST",
          body: JSON.stringify({ answers: userAnswers, userName }),
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
    loadResults();
  }, [userAnswers, router]);

  if (!result) return null;

  const { userScore, skillScore, totalScore, leaderboard } = result;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Quize Summary</h1>
      <UserResult
        skillScore={skillScore}
        totalQuestions={questions?.length}
        totalScore={totalScore}
        userName={userName}
        userScore={userScore}
      />
      <PlayersResult leaderboard={leaderboard} />
    </div>
  );
}
