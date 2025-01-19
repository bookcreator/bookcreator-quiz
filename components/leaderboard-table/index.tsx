import React from "react";
import styles from "./index.module.css";
import { SortType } from "@/types/quiz";

interface LeaderboardTableProps {
  leaderboard: { id: string; name: string; score: number; added?: boolean }[];
  sortType: SortType;
  startIndex: number;
  pageSize: number;
  scoreId?: string;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  leaderboard,
  sortType,
  startIndex,
  pageSize,
  scoreId,
}) => {
  const addedEntry = leaderboard.find((entry) => entry.added);
  const normalEntries = leaderboard.filter((entry) => !entry.added);

  return (
    <table className={styles.leaderboard}>
      <thead>
        <tr>
          <th className={styles.rank}>Rank</th>
          <th className={styles.name}>
            Name {sortType === "Name" && <span>▼</span>}
          </th>
          <th className={styles.score}>
            Score {sortType === "Score" && <span>▼</span>}
          </th>
        </tr>
      </thead>
      <tbody>
        {leaderboard.length === pageSize ? (
          leaderboard.map((entry, index) => (
            <tr
              key={index}
              className={entry.id === scoreId ? styles.active : ""}
            >
              <td className={styles.rank}>{startIndex + index + 1}</td>
              <td className={styles.name}>{entry.name}</td>
              <td className={styles.score}>{entry.score}</td>
            </tr>
          ))
        ) : (
          <>
            {addedEntry && leaderboard[0].added && (
              <tr
                key="added"
                className={addedEntry.id === scoreId ? styles.active : ""}
              >
                <td className={styles.rank}></td>
                <td className={styles.name}>{addedEntry.name}</td>
                <td className={styles.score}>{addedEntry.score}</td>
              </tr>
            )}
            {normalEntries.map((entry, index) => (
              <tr
                key={index}
                className={entry.id === scoreId ? styles.active : ""}
              >
                <td className={styles.rank}>{startIndex + index + 1}</td>
                <td className={styles.name}>{entry.name}</td>
                <td className={styles.score}>{entry.score}</td>
              </tr>
            ))}
            {addedEntry && !leaderboard[0].added && (
              <tr
                key="added"
                className={addedEntry.id === scoreId ? styles.active : ""}
              >
                <td className={styles.rank}></td>
                <td className={styles.name}>{addedEntry.name}</td>
                <td className={styles.score}>{addedEntry.score}</td>
              </tr>
            )}
          </>
        )}
      </tbody>
    </table>
  );
};

export default LeaderboardTable;
