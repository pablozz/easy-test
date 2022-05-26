import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Card,
  Paragraph,
  Title,
  Button as PaperButton,
  ActivityIndicator,
} from "react-native-paper";

import { RootStackParamList } from "../navigation";
import { Urls } from "../constants/urls";
import { useAuth } from "../hooks/useAuth";

export type TestsListProps = NativeStackScreenProps<
  RootStackParamList,
  "TestsList"
>;

const TestsList = ({ route, navigation }: TestsListProps) => {
  const [tests, setTests] = useState<any>(null); // @TODO: add appropriate type
  const [loading, setLoading] = useState(false);

  const { getJWT } = useAuth(navigation);

  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);

      const response = await fetch(Urls.DEV_API + "/Tests/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await getJWT()),
        },
      }).then(async (res) => {
        return await res.json();
      });

      setLoading(false);
      setTests(response);
    };

    fetchTests();
  }, []);

  return (
    <ScrollView>
      <View>
        <Text style={styles.sectionTitle}>Created tests</Text>
        {/* @TODO: add appropriate type */}
        {loading ? (
          <ActivityIndicator animating={loading} />
        ) : (
          tests?.createdTests?.map((test: any, index: number) => (
            <Card key={index} style={styles.card}>
              <Card.Title title={test.name} subtitle={test.description} />
              <Card.Actions
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <PaperButton
                  onPress={() =>
                    navigation.navigate("CreatedTestReview", {
                      test,
                    })
                  }
                >
                  View
                </PaperButton>
              </Card.Actions>
            </Card>
          ))
        )}
      </View>
      <View>
        <Text style={styles.sectionTitle}>Solved tests</Text>
        {loading ? (
          <ActivityIndicator animating={loading} />
        ) : (
          tests?.solvedTests?.map(
            ({ testName, description, answeredTestId }: any, index: number) => (
              <Card key={index} style={styles.card}>
                <Card.Title title={testName} subtitle={description} />
                <Card.Actions
                  style={{ display: "flex", justifyContent: "flex-end" }}
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
                </Card.Actions>
              </Card>
            )
          )
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    marginVertical: 24,
    marginHorizontal: 12,
  },
  card: {
    marginBottom: 8,
  },
});

export default TestsList;
