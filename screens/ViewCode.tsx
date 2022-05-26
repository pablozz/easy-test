import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import Clipboard from "@react-native-community/clipboard";

import { RootStackParamList } from "../navigation";

export type ViewCodeProps = NativeStackScreenProps<
  RootStackParamList,
  "ViewCode"
>;

const ViewCode = ({ route, navigation }: ViewCodeProps) => {
  const { code } = route.params;
  const copyCode = (code: string): void => {
    Clipboard.setString(code);
  };
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.code}>{code}</Text>
      </View>
      <Button onPress={() => copyCode(code)} title="Copy test code" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
    padding: 10,
  },
  textContainer: {
    padding: 25,
    borderWidth: 5,
    marginBottom: 10,
    borderRadius: 12,
  },
  code: {
    fontSize: 36,
  },
});

export default ViewCode;
