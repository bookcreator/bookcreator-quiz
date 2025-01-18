"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/button";
import styles from "./page.module.css";
import { QuizContext } from "@/context/quiz";

export default function Home() {
  const { assignUserName } = useContext(QuizContext);
  const [name, setName] = useState("");
  const router = useRouter();

  const handleStart = () => {
    assignUserName(name);
    router.push(`/quiz/question/1`);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Book Creator Quiz</h1>
        <div className={styles.formgroup}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className={styles.input}
          />
          <Button large onClick={handleStart}>
            Start
          </Button>
        </div>
      </main>
    </div>
  );
}
