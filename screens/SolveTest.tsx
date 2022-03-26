import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text } from "react-native";

import { RootStackParamList } from "../navigation";

export type SolveTestProps = NativeStackScreenProps<
  RootStackParamList,
  "SolveTest"
>;

const SolveTest = () => {
  return <Text>Solve test</Text>;
};

export default SolveTest;
