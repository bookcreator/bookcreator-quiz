import { SortType } from "@/types/quiz";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const {
    page,
    resultsPerPage,
    sortType,
  }: {
    page: number;
    resultsPerPage: number;
    sortType: SortType;
  } = await request.json();

  const scores = await prisma.score.findMany({
    select: {
      id: true,
      name: true,
      score: true,
    },
    orderBy: sortType === "Name" ? { name: "asc" } : { score: "desc" },
    take: resultsPerPage,
    skip: (page - 1) * resultsPerPage,
  });

  const totalScores = await prisma.score.count();
  const totalPages = Math.ceil(totalScores / resultsPerPage);

  return new Response(
    JSON.stringify({
      leaderboard: scores,
      totalPages,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
