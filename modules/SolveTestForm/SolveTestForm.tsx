import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Urls } from "../../constants/urls";

import { TestQuestion } from "../../types/test";
import Answer from "./Answer";

interface ISolveTestFormProps {
  questions: TestQuestion[];
  jwt: string;
}

const SolveTestForm = ({ questions, jwt }: ISolveTestFormProps) => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleSubmit = async () => {
    const data = Object.entries(answers).map((value) => ({
      questionId: value[0],
      answer: value[1],
    }));
    const response = await fetch(Urls.DEV_API + "/tests/answered", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(data),
    }).then((res) => res.status);
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
