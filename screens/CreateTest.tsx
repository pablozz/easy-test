import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text } from "react-native";

import { RootStackParamList } from "../navigation";

export type CreateTestProps = NativeStackScreenProps<
  RootStackParamList,
  "CreateTest"
>;

const CreateTest = ({ navigation }: CreateTestProps) => {
  return <Text>Create test</Text>;
};

export default CreateTest;
