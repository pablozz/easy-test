import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import SolveTestForm from "../modules/SolveTestForm";

import { RootStackParamList } from "../navigation";

export type SolveTestProps = NativeStackScreenProps<
  RootStackParamList,
  "SolveTest"
>;

const SolveTest = ({ route }: SolveTestProps) => {
  const { name, description, questions } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{name}</Text>
        <Text>{description}</Text>
      </View>
      <SolveTestForm questions={questions} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "stretch",
    justifyContent: "flex-start",
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
  },
});

export default SolveTest;
