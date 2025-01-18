import styles from "./index.module.css";

interface PaginationProps {
  skillScore: number;
  totalQuestions: number;
  totalScore: number;
  userName: string;
  userScore: number;
}

const SUCCESS_PERCENT = 0.8;

export default function UserResult(props: PaginationProps) {
  const { skillScore, totalQuestions, totalScore, userName, userScore } = props;

  const successRate = Math.round(totalQuestions * SUCCESS_PERCENT);
  const title = userScore < successRate ? "🥺 Sorry" : "🎉 Congratulations";

  return (
    <div className={styles.container}>
      <div className={styles.result}>
        <h2>
          {title}, {userName}!
        </h2>
        <p className={styles.scores}>
          Your skill score <strong>{skillScore}</strong>, totaling{" "}
          <strong>{totalScore}</strong>
        </p>
      </div>
      <div className={styles.details}>
        <div className={styles.detail}>
          {totalQuestions}
          <span className={styles.label}>Questions</span>
        </div>
        <div className={styles.detail}>
          {userScore}
          <span className={styles.label}>Correct</span>
        </div>
        <div className={styles.detail}>
          {totalQuestions - userScore}
          <span className={styles.label}>Failed</span>
        </div>
      </div>
    </div>
  );
}
