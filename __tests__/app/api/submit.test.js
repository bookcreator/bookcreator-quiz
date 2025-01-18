/**
 * @jest-environment node
 */

import { POST } from "../../../app/api/submit/route";
const requestObj = {
  json: async () => ({
    answers: { 0: 1, 1: 0, 2: 2 },
    userName: "Player 1"
  }),
};

it("should return data with status 200", async () => {
  const response = await POST(requestObj);
  const body = await response.json();
  expect(response.status).toBe(200);
  expect(Object.keys(body)).toEqual([
    "answers",
    "userScore",
    "skillScore",
    "totalScore",
    "leaderboard",
    "userName",
  ]);
  expect(body.userScore).toEqual(1);
  expect(body.skillScore).toBeGreaterThan(-1);
  expect(body.skillScore).toBeLessThan(3001);
  expect(body.userName).toEqual("Player 1");
  expect(body.leaderboard.length).toEqual(10001);
  const userEntry = body.leaderboard.find(user => user.name === "Player 1");
  expect(userEntry.score).toEqual(body.totalScore);
  expect(userEntry.name).toEqual(body.userName);
});
