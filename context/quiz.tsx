"use client";

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
  userName: "",
  assignUserName: (name: string) => {},
  userScore: 0,
  assignUserScore: (score: number) => {},
  skillScore: 0,
  assignSkillScore: (score: number) => {},
  scoreId: "",
  assignScoreId: (id: string) => {},
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [failed, setFailed] = useState(false);
  const [userName, setUserName] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [skillScore, setSkillScore] = useState(0);
  const [scoreId, setScoreId] = useState("");

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

  const assignUserName = (name: string) => {
    setUserName(name);
  };

  const assignUserScore = (score: number) => {
    setUserScore(score);
  };

  const assignSkillScore = (score: number) => {
    setSkillScore(score);
  };

  const assignScoreId = (id: string) => {
    setScoreId(id);
  };

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
        userName,
        assignUserName,
        userScore,
        assignUserScore,
        skillScore,
        assignSkillScore,
        scoreId,
        assignScoreId,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useAppContext() {
  return useContext(QuizContext);
}
