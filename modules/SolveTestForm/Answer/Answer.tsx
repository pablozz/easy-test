import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Checkbox, RadioButton } from "react-native-paper";

import Input from "../../../components/Input.tsx"; // @TODO: add typescript imports "@"
import { TestAnswer } from "../../../types/test";

interface IAnswerProps {
  type: string; // @TODO: add enum
  options?: TestAnswer[]; // @TODO: add condition: only optional if type is "open"
  onChange: (arg0: string) => void;
  value: string;
}

const Answer = ({ type, options, onChange, value }: IAnswerProps) => {
  if (type === "open") {
    return <Input onChangeText={onChange} />;
  }

  if (type === "radio") {
    return (
      <View>
        {options?.map(({ answerId, answer }) => {
          return (
            <View key={`option-${answerId}`} style={styles.radioContainer}>
              <RadioButton
                value={answerId}
                status={value === answerId ? "checked" : "unchecked"}
                onPress={() => onChange(answerId)}
              />
              <Text style={styles.label}>{answer}</Text>
            </View>
          );
        })}
      </View>
    );
  }

  if (type === "checkbox") {
    return (
      <View>
        {options?.map(({ answerId, answer }) => {
          return (
            <View key={`option-${answerId}`} style={styles.checkboxContainer}>
              <Checkbox
                status={value === answerId ? "checked" : "unchecked"}
                onPress={() => onChange(answerId)}
              />
              <Text style={styles.label}>{answer}</Text>
            </View>
          );
        })}
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    marginLeft: 8,
  },
});

export default Answer;
