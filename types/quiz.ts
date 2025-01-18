export type QuizQuestion = {
  title: string;
  answers: string[];
  correctAnswer: number;
};

export type UserAnswers = {
  [key: number]: number;
};

export type ResultAnswer = {
  correct: boolean;
};

export type QuizResult = {
  leaderboard: Leaderboard;
  totalPages: number;
};

export type Leaderboard = LeaderboardEntry[];

export type LeaderboardEntry = {
  id: string;
  name: string;
  score: number;
};

export type SortType = "Score" | "Name";
