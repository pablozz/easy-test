import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
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
import { getJWT } from "../utils/storage";

export type TestsListProps = NativeStackScreenProps<
  RootStackParamList,
  "TestsList"
>;

const TestsList = ({ route, navigation }: TestsListProps) => {
  const [tests, setTests] = useState<any>(null); // @TODO: add appropriate type
  const [loading, setLoading] = useState(false);
  const [jwt, setJWT] = useState<string | null>(null);

  useEffect(() => {}, []);

  useEffect(() => {
    const fetchJWT = async () => {
      const token = await getJWT();
      setJWT(token);
    };
    fetchJWT();

    const fetchTests = async () => {
      setLoading(true);
      const response = await fetch(Urls.DEV_API + "/Tests/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      }).then(async (res) => {
        return res.json();
      });

      setLoading(false);
      setTests(response);
    };

    fetchTests();
  }, []);

  return (
    <View>
      <View>
        <Text style={styles.sectionTitle}>Created tests</Text>
        {/* @TODO: add appropriate type */}
        {loading ? (
          <ActivityIndicator animating={loading} />
        ) : (
          tests?.createdTests?.map(
            ({ name, description }: any, index: number) => (
              <Card key={index}>
                <Card.Title title={name} subtitle={description} />
                <Card.Actions
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <PaperButton onPress={() => console.log("a")}>
                    View
                  </PaperButton>
                </Card.Actions>
              </Card>
            )
          )
        )}
      </View>
      <View>
        <Text style={styles.sectionTitle}>Solved tests</Text>
        {loading ? (
          <ActivityIndicator animating={loading} />
        ) : (
          tests?.solvedTests?.map(
            ({ testName, description }: any, index: number) => (
              <Card key={index}>
                <Card.Title title={testName} subtitle={description} />
                <Card.Actions
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <PaperButton onPress={() => console.log("b")}>
                    View
                  </PaperButton>
                </Card.Actions>
              </Card>
            )
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    marginVertical: 24,
    marginHorizontal: 12,
  },
});

export default TestsList;
