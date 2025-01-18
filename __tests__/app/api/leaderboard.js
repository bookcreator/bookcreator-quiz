/**
 * @jest-environment node
 */

import { PrismaClient } from "@prisma/client";
import { POST } from "../../../app/api/leaderboard/route";

jest.mock("@prisma/client", () => {
  const mPrismaClient = {
    score: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const requestObj = {
  json: async () => ({
    page: 1,
    resultsPerPage: 10,
    sortType: "Score",
  }),
};

it("should return data with status 200", async () => {
  const mockScores = [
    { id: "uuid1", name: "Player 1", score: 100 },
    { id: "uuid2", name: "Player 2", score: 90 },
    { id: "uuid3", name: "Player 3", score: 80 },
    { id: "uuid4", name: "Player 4", score: 70 },
    { id: "uuid5", name: "Player 5", score: 60 },
    { id: "uuid6", name: "Player 6", score: 50 },
    { id: "uuid7", name: "Player 7", score: 40 },
    { id: "uuid8", name: "Player 8", score: 30 },
    { id: "uuid9", name: "Player 9", score: 20 },
    { id: "uuid10", name: "Player 10", score: 10 },
  ];

  PrismaClient().score.findMany.mockResolvedValue(mockScores);
  PrismaClient().score.count.mockResolvedValue(mockScores.length);

  const response = await POST(requestObj);
  const body = await response.json();
  expect(response.status).toBe(200);
  expect(Object.keys(body)).toEqual(["leaderboard", "totalPages"]);
  expect(body.leaderboard.length).toEqual(10);
  expect(body.totalPages).toEqual(1);
});
