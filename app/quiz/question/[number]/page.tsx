"use client";
import { useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { QuizContext } from "../../../../context/quiz";
import Answers from "../../../../components/quiz/answers";
import Button from "../../../../components/button";
import styles from "./page.module.css";

export default function QuizPage() {
  const {
    answerQuestion,
    userAnswers,
    questions,
    userName,
    assignUserScore,
    assignSkillScore,
    assignScoreId,
  } = useContext(QuizContext);
  const params = useParams();
  const router = useRouter();

  if (!params.number || !questions) return null;

  const pageNumber = Number(params.number);
  const questionIndex = pageNumber - 1;
  const question = questions[questionIndex];

  const isLastQuestion = pageNumber === questions.length;

  if (!question) return null;

  const handleButtonClick = async () => {
    const lastPage = Object.keys(userAnswers).length === questions.length;
    if (lastPage) {
      try {
        const response = await fetch("/api/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userAnswers,
            userName,
          }),
        });

        if (response.ok) {
          const { userScore, skillScore, scoreId } = await response.json();
          assignUserScore(userScore);
          assignSkillScore(skillScore);
          assignScoreId(scoreId);
          router.push(`/quiz/complete`);
        } else {
          console.error("Failed to submit quiz");
        }
      } catch (error) {
        console.error("Error submitting quiz:", error);
      }
    } else {
      router.push(`/quiz/question/${pageNumber + 1}`);
    }
  };

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
          onClick={handleButtonClick}
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
