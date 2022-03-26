import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Button, StyleSheet } from "react-native";

import { RootStackParamList } from "../navigation";

export type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation }: HomeProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate("SolveTest")}
          title="Solve test"
          color="#841584"
          accessibilityLabel="Solve test"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate("CreateTest")}
          title="Create test"
          color="#B8860B"
          accessibilityLabel="Create test"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "stretch",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginBottom: 8,
  },
});

export default Home;
