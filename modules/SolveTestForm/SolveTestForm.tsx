import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { TestQuestion } from "../../types/test";
import Answer from "./Answer";

interface ISolveTestFormProps {
  questions: TestQuestion[];
}

const SolveTestForm = ({ questions }: ISolveTestFormProps) => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleSubmit = () => {
    console.log(answers);
  };

  return (
    <View style={styles.container}>
      {questions.map(({ questionId, text, questionType, answers: options }) => {
        return (
          <View key={`question-${questionId}`} style={styles.questionContainer}>
            <Text style={styles.question}>{text}</Text>
            <Answer
              type={questionType}
              options={options}
              onChange={(answer: string) =>
                setAnswers({ ...answers, [questionId]: answer })
              }
              value={answers[questionId]}
            />
          </View>
        );
      })}
      <Button onPress={handleSubmit} title="Submit" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  questionContainer: {
    backgroundColor: "#DCDCDC",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginBottom: 16,
  },
  question: {
    fontWeight: "700",
    marginBottom: 8,
  },
});

export default SolveTestForm;
