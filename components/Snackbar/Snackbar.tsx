import React from "react";
import { StyleSheet } from "react-native";
import { Snackbar as PaperSnackbar } from "react-native-paper";

// @TODO: add appropriate type
const Snackbar = ({ children, ...props }: any) => {
  return (
    <PaperSnackbar style={styles.snackbar} {...props}>
      {children}
    </PaperSnackbar>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    backgroundColor: "red",
  },
});

export default Snackbar;
