import { UserAnswers } from "@/types/quiz";
import questions from "../questions/questions.json";
import leaderboard from "./leaderboard.json";
export async function POST(request: Request) {
  const { answers }: { answers: UserAnswers } = await request.json();

  let checkedAnswers = Object.entries(answers).map(
    ([questionIndex, answer]) => {
      const index = parseInt(questionIndex);
      return {
        correct: questions[index].correctAnswer === answer,
      };
    }
  );

  const userName = "Player 1";
  const userScore = checkedAnswers.filter(answer => answer.correct).length;
  // Assing a random skill of 0-3000 to their score to make it more interesting
  const skillScore = Math.floor(Math.random() * 3000);
  const totalScore = userScore + skillScore;
  const leaderboardWithNewUser = [
    ...leaderboard,
    { id: crypto.randomUUID(), name: userName, score: totalScore },
  ];

  leaderboardWithNewUser.sort((a, b) => b.score - a.score);

  return Response.json({
    answers: checkedAnswers,
    userScore,
    skillScore,
    totalScore,
    leaderboard: leaderboardWithNewUser,
    userName,
  });
}
