import questions from "./questions.json";

export async function GET(request: Request) {
  let questionResponse = questions.map(question => {
    const { title, answers } = question;
    return { title, answers };
  });
  return Response.json(questionResponse);
}
