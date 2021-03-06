import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import Input from "../components/Input";
import { Urls } from "../constants/urls";
import { useAuth } from "../hooks/useAuth";
import { RootStackParamList } from "../navigation";
import { Test } from "../types/test";
import { getJWT } from "../utils/storage";

type EnterCodeProps = NativeStackScreenProps<RootStackParamList, "CreateTest">;

const EnterCode = ({ navigation }: EnterCodeProps) => {
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  // const [jwt, setJWT] = useState<string | null>(null);

  useAuth(navigation);

  // useEffect(() => {
  // const fetchJWT = async () => {
  // const token = await getJWT();
  // setJWT(token);
  //   };
  //   fetchJWT().then(() => {
  //     if (!jwt) {
  //       // navigation.navigate("Login");
  //     }
  //   });
  // }, []);

  const handleSubmit = async (): Promise<void> => {
    const response: Test = await fetch(`${Urls.DEV_API}/Tests/${code}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json());

    if (!response.testId) {
      setCodeError(true);
      return;
    }

    navigation.navigate("SolveTest", response);
  };

  return (
    <View style={styles.container}>
      <Text style={codeError && styles.labelError}>Enter a code:</Text>
      <Input onChangeText={setCode} error={codeError} autoCapitalize="none" />
      <Button
        onPress={handleSubmit}
        title="Submit"
        accessibilityLabel="Submit"
        disabled={!code.length}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 24,
  },
  labelError: {
    color: "#DC143C",
  },
});

export default EnterCode;
