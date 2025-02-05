import { QuizQuestion, UserAnswers } from "@/types/quiz";
import { createContext, useEffect, useContext, useState } from "react";

export const QuizContext = createContext({
  userAnswers: {},
  answerQuestion: ({
    questionNumber,
    answer,
  }: {
    questionNumber: number;
    answer: number;
  }) => {},
  questions: [] as QuizQuestion[],
  failed: false,
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const res = await fetch("/api/questions");
        const questions: QuizQuestion[] = await res.json();
        setQuestions(questions);
      } catch (e) {
        setFailed(true);
        console.error(e);
      }
    };
    loadQuestions();
  }, []);

  const answerQuestion = ({
    questionNumber,
    answer,
  }: {
    questionNumber: number;
    answer: number;
  }) => {
    const ua = { ...userAnswers };
    if (userAnswers[questionNumber - 1] === answer) {
      delete ua[questionNumber - 1];
    } else {
      ua[questionNumber - 1] = answer;
    }
    setUserAnswers(ua);
  };

  return (
    <QuizContext.Provider
      value={{
        userAnswers: userAnswers as UserAnswers,
        answerQuestion,
        questions,
        failed,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useAppContext() {
  return useContext(QuizContext);
}
