import React from "react";
import styles from "./index.module.css";

interface UserScoreProps {
  userName: string;
  userScore: number;
  skillScore: number;
}

const UserScore: React.FC<UserScoreProps> = ({
  userName,
  userScore,
  skillScore,
}) => {
  return (
    <>
      <p data-testid="user-score-body" className={styles.score}>
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
  );
};

export default UserScore;
