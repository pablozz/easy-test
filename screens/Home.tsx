import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Button, StyleSheet } from "react-native";

import { RootStackParamList } from "../navigation";
import { useAuth } from "../hooks/useAuth";

export type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation }: HomeProps) => {
  const { jwt, deleteJWT } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate("EnterCode")}
          title="Solve test"
          color="#8FBC8F"
          accessibilityLabel="Solve test"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate("CreateTest")}
          title="Create test"
          color="#8FBC8F"
          accessibilityLabel="Create test"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate("TestsList")}
          title="Review tests"
          color="#8FBC8F"
          accessibilityLabel="Review testst"
        />
      </View>
      {!!jwt ? (
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              deleteJWT();
            }}
            title="Logout"
            color="#B88584"
            accessibilityLabel="Logout"
          />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate("Login")}
            title="Login"
            color="#841584"
            accessibilityLabel="Login"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "stretch",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    marginBottom: 8,
  },
});

export default Home;
