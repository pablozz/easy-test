import { QuestionType } from "../constants/questionTypes";

export type TestAnswer = {
  answerId: string;
  answer: string;
};

export type TestQuestion = {
  questionId: string;
  text: string;
  questionType: string; // @TODO: add enum
  answers: TestAnswer[];
};

export type Test = {
  testId: string;
  name: string;
  description: string;
  code: string;
  questions: TestQuestion[];
};
