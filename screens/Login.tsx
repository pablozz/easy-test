import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Controller, useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { Button, Text, View, StyleSheet } from "react-native";

import { RootStackParamList } from "../navigation";

import { Urls } from "../constants/urls";
import Input from "../components/Input";
import Snackbar from "../components/Snackbar";

import { useAuth } from "../hooks/useAuth";
export type LoginProps = NativeStackScreenProps<RootStackParamList, "Login">;

type FormData = {
  email: string;
  password: string;
};

const Login = ({ navigation }: LoginProps) => {
  const [errorSnackbarVisible, setErrorSnackbarVisible] = useState(false);

  const { jwt, saveJWT } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "mantas.ptakauskas@gmail.com",
      password: "testas123",
    },
  });

  useEffect(() => {
    if (jwt !== null) {
      navigation.navigate("Home");
    }
  }, [jwt]);

  const onSubmit = async (data: FormData) => {
    const response = await fetch(Urls.DEV_API + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (!response.jwt) {
      setErrorSnackbarVisible(true);
    }

    saveJWT(response.jwt);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.loginCointainer}>
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 5,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Email"
                accessibilityLabel="Email"
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text>Your email should be at least 5 characters long</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 5,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Password"
                accessibilityLabel="Password"
                secureTextEntry={true}
              />
            )}
            name="password"
          />
          {errors.email && (
            <Text>Your password should be at least 5 characters long</Text>
          )}
          <Button onPress={handleSubmit(onSubmit)} title="login" />
        </View>
        <View style={styles.registerContainer}>
          <Text>Don't have an account yet?</Text>
          <View>
            <Button
              onPress={() => navigation.navigate("Register")}
              title="Register"
              color="#B88584"
              accessibilityLabel="Register"
            />
          </View>
        </View>
      </View>
      <Snackbar
        visible={errorSnackbarVisible}
        onDismiss={() => setErrorSnackbarVisible(false)}
      >
        Failed to login
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    padding: 10,
  },
  loginCointainer: {
    width: "100%",
  },
  textContainer: {
    padding: 25,
    borderWidth: 5,
    marginBottom: 10,
    borderRadius: 12,
  },
  registerContainer: {
    width: "100%",
    marginBottom: 64,
  },
});

export default Login;
