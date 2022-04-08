import React from "react";
import { TextInput as RNTextInput, StyleSheet } from "react-native";

// @TODO: add appropriate type
const Input = ({ style, error, ...props }: any) => {
  return (
    <RNTextInput
      style={[styles.input, error && styles.inputError, style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 3,
    marginVertical: 4,
    fontSize: 20,
    padding: 8,
    backgroundColor: "white",
  },
  inputError: {
    borderWidth: 3,
    borderColor: "#DC143C",
  },
});

export default Input;
