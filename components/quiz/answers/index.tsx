import styles from "./index.module.css";
import Answer from "./answer";
import { UserAnswers } from "@/types/quiz";

interface AnswersProps {
  answers: string[];
  answerQuestion: (answer: { questionNumber: number; answer: number }) => void;
  questionNumber: number;
  userAnswers: UserAnswers;
}

export default function Answers(props: AnswersProps) {
  const { answers, answerQuestion, questionNumber, userAnswers } = props;

  return (
    <div className={styles.container}>
      {answers.map((answer, i) => (
        <Answer
          answer={answer}
          chosen={userAnswers[questionNumber - 1] === i}
          key={i}
          onAnswer={() => answerQuestion({ questionNumber, answer: i })}
        />
      ))}
    </div>
  );
}
