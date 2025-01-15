/**
 * @jest-environment node
 */

import { POST } from "../../../app/api/submit/route";
const requestObj = {
  json: async () => ({
    answers: { 0: 1, 1: 0, 2: 2 },
  }),
};

it("should return data with status 200", async () => {
  const response = await POST(requestObj);
  const body = await response.json();
  expect(response.status).toBe(200);
  expect(body).toEqual({
    answers: [{ correct: false }, { correct: false }, { correct: true }],
  });
});
