export type QuestionType = {
  type: string; // @TODO: add enum
  name: string;
  answers: boolean;
};

const openQuestion: QuestionType = {
  type: "open",
  name: "Open Question",
  answers: false,
};

const radioQuestion: QuestionType = {
  type: "radio",
  name: "Radio Question",
  answers: true,
};

const checkboxQuestion: QuestionType = {
  type: "checkbox",
  name: "Checkbox Question",
  answers: true,
};

export const questionTypesArray = [
  openQuestion,
  radioQuestion,
  checkboxQuestion,
];

export const questionTypesObject: IQuestionTypesObject = {
  open: openQuestion,
  radio: radioQuestion,
  checkbox: checkboxQuestion,
};

export interface IQuestionTypesObject {
  [key: string]: QuestionType;
}
