import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, StyleSheet } from "react-native";

import { RootStackParamList } from "../navigation";
import { Urls } from "../constants/urls";
import { useAuth } from "../hooks/useAuth";
import { ActivityIndicator } from "react-native-paper";

export type TestReviewProps = NativeStackScreenProps<
  RootStackParamList,
  "TestReview"
>;

const TestReview = ({ route, navigation }: TestReviewProps) => {
  const { testId } = route.params;

  const [loading, setLoading] = useState(false);
  const [test, setTest] = useState<any>({}); // @TODO: add appropriate type

  const { getJWT } = useAuth(navigation);

  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);

      const response = await fetch(`${Urls.DEV_API}/Tests/answered/${testId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await getJWT()),
        },
      }).then(async (res) => {
        return await res.json();
      });

      setLoading(false);
      setTest(response);
    };

    fetchTests();
  }, []);

  return (
    <View>
      {loading ? (
        <ActivityIndicator animating={loading} />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>{test.testName}</Text>
          <Text style={styles.score}>
            Score: <Text style={styles.bold}>{test.totalScore}</Text>
          </Text>
          <Text style={styles.score}>
            Solved at: <Text style={styles.bold}>{test.solvedAt}</Text>
          </Text>
          <View style={styles.questionsContainer}>
            {test.questions?.map(({ text, answers, questionId }: any) => {
              return (
                <View style={styles.questionContainer} key={questionId}>
                  <Text style={styles.bold}>{text}</Text>
                  <View>
                    {answers.map(({ answer, isCorrect, answerId }: any) => {
                      return (
                        <Text
                          key={answerId}
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
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: { fontSize: 32, marginBottom: 12 },
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
});

export default TestReview;
