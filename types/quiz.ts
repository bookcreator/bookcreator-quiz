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
  answers: ResultAnswer[];
  userName: string;
  userScore: number;
  skillScore: number;
  totalScore: number;
  leaderboard: Leaderboard;
};

export type Leaderboard = LeaderboardEntry[];

export type LeaderboardEntry = {
  id: string;
  name: string;
  score: number;
};
