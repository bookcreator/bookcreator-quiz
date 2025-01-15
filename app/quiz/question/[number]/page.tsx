"use client";
import { useContext } from "react";
import { useParams } from "next/navigation";
import { QuizContext } from "../../../../context/quiz";
import Answers from "../../../../components/quiz/answers";
import Button from "../../../../components/button";
import styles from "./page.module.css";

export default function QuizPage() {
  const ctx = useContext(QuizContext);
  const params = useParams();

  const { answerQuestion, userAnswers, questions } = ctx;

  if (!params.number || !questions) return null; // Set in a useEffect so undefined on first render

  const pageNumber = Number(params.number);
  const questionIndex = pageNumber - 1;
  const question = questions[questionIndex];

  const isLastQuestion = pageNumber === questions.length;

  if (!question) return null;

  return (
    <div>
      <h1 className={styles.questionNumber}>
        Question {pageNumber} <small>/ {questions.length}</small>
      </h1>
      <h2 className={styles.questionTitle}>{question.title}</h2>
      <Answers
        answers={question.answers}
        answerQuestion={answerQuestion}
        questionNumber={pageNumber}
        userAnswers={userAnswers}
      />
      <div className={styles.actions}>
        {pageNumber > 1 ? (
          <Button
            href={`/quiz/question/${pageNumber - 1}`}
            text
            style={{ marginRight: "auto" }}
            secondary
            icon="leftarrow"
          >
            Back
          </Button>
        ) : null}
        <Button
          href={
            Object.keys(userAnswers).length === questions.length
              ? `/quiz/complete`
              : `/quiz/question/${pageNumber + 1}`
          }
          disabled={
            userAnswers[(pageNumber - 1) as keyof typeof userAnswers] ===
            undefined
          }
          style={{ marginLeft: "auto" }}
        >
          {isLastQuestion ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
}
