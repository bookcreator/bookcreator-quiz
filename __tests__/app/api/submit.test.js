/**
 * @jest-environment node
 */

import { PrismaClient } from "@prisma/client";
import { POST } from "../../../app/api/submit/route";

jest.mock("@prisma/client", () => {
  const mPrismaClient = {
    score: {
      create: jest.fn().mockResolvedValue({ id: "test-id" }),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const requestObj = {
  json: async () => ({
    userAnswers: { 0: 1, 1: 0, 2: 2 },
    userName: "Player 1",
  }),
};

it("should return data with status 200", async () => {
  const response = await POST(requestObj);
  const body = await response.json();
  expect(response.status).toBe(200);
  expect(Object.keys(body)).toEqual(["userScore", "skillScore", "scoreId"]);
  expect(body.userScore).toEqual(1);
  expect(body.skillScore).toBeGreaterThan(-1);
  expect(body.skillScore).toBeLessThan(3001);
  expect(body.scoreId).toEqual("test-id");
});
