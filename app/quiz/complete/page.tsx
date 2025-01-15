"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QuizContext } from "../../../context/quiz";
import styles from "./page.module.css";
import { QuizResult, UserAnswers } from "@/types/quiz";

export default function QuizComplete() {
  const { userAnswers } = useContext(QuizContext);
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
          body: JSON.stringify({ answers: userAnswers }),
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

  const { userName, userScore, skillScore, totalScore, leaderboard } = result;

  console.log({ leaderboard });

  return (
    <div className={styles.container}>
      <p className={styles.score}>
        🎉 <strong>{userName}</strong>, you answered{" "}
        <strong>{userScore}</strong> questions correctly and gained a skill
        score of <strong>{skillScore}</strong>, giving you a total score of{" "}
        <strong>{totalScore}</strong> 🎉
      </p>
    </div>
  );
}
