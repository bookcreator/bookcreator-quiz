import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { UserAnswers } from "@/types/quiz";
import questions from "../questions/questions.json";

export async function POST(request: Request) {
  const {
    userAnswers,
    userName,
  }: { userAnswers: UserAnswers; userName: string } = await request.json();

  let checkedAnswers = Object.entries(userAnswers).map(
    ([questionIndex, answer]) => {
      const index = parseInt(questionIndex);
      return {
        correct: questions[index].correctAnswer === answer,
      };
    }
  );

  const userScore = checkedAnswers.filter((answer) => answer.correct).length;
  const skillScore = Math.floor(Math.random() * 3000);
  const totalScore = userScore + skillScore;

  const { id } = await prisma.score.create({
    data: {
      name: userName,
      score: totalScore,
    },
  });

  return new Response(
    JSON.stringify({
      userScore,
      skillScore,
      scoreId: id,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
