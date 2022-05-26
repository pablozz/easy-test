import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import { getJWT } from "../utils/storage";
import { RootStackParamList } from "../navigation";

export type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation }: HomeProps) => {
  const [jwt, setJWT] = useState<string | null>(null);

  useEffect(() => {
    const fetchJWT = async () => {
      const token = await getJWT();
      setJWT(token);
    };
    fetchJWT();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate("EnterCode")}
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
      {!jwt && (
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate("Login")}
            title="Login"
            color="#B88584"
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
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginBottom: 8,
  },
});

export default Home;
