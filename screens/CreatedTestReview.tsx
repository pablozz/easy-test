import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";

import { RootStackParamList } from "../navigation";
import { Urls } from "../constants/urls";
import { useAuth } from "../hooks/useAuth";

export type CreatedTestReviewProps = NativeStackScreenProps<
  RootStackParamList,
  "CreatedTestReview"
>;

const CreatedTestReview = ({ route, navigation }: CreatedTestReviewProps) => {
  const { test } = route.params;

  useAuth(navigation);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>{test.name}</Text>
        <Text>{test.description}</Text>
        <View style={styles.questionsContainer}>
          <Text style={styles.sectionTitle}>Questions</Text>
          {test.questions?.map(({ text, answers, questionId }: any) => {
            return (
              <View key={questionId} style={styles.questionContainer}>
                <Text style={styles.bold}>{text}</Text>
                <View>
                  {answers.map(({ answer, isCorrect }: any) => {
                    return (
                      <Text
                        style={{
                          color: isCorrect ? "green" : "red",
                        }}
                      >
                        {answer}
                      </Text>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
        <View style={styles.questionsContainer}>
          <Text style={styles.sectionTitle}>Solutions</Text>
          {test.solutions?.map(({ solver, answeredTestId }: any) => {
            return (
              <View key={answeredTestId} style={styles.questionContainer}>
                <Text style={styles.bold}>{solver.name}</Text>
                <Text>{solver.email}</Text>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <PaperButton
                    onPress={() =>
                      navigation.navigate("TestReview", {
                        testId: answeredTestId,
                      })
                    }
                  >
                    View
                  </PaperButton>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: { fontSize: 32, marginBottom: 8 },
  score: {
    fontSize: 18,
  },
  bold: {
    fontWeight: "bold",
  },
  questionsContainer: { marginTop: 24 },
  questionContainer: {
    backgroundColor: "#DCDCDC",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 8,
  },
});

export default CreatedTestReview;
