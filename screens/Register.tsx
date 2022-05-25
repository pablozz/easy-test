import React, { useState } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Input from "../components/Input";
import { Urls } from "../constants/urls";
import { RootStackParamList } from "../navigation";
import Snackbar from "../components/Snackbar";

export type RegisterProps = NativeStackScreenProps<
  RootStackParamList,
  "Register"
>;

type FormData = {
  displayName: string;
  email: string;
  password: string;
};

const Register = ({ navigation }: RegisterProps) => {
  const [errorSnackbarVisible, setErrorSnackbarVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      displayName: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const response = await fetch(Urls.DEV_API + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (!response) {
      setErrorSnackbarVisible(true);
      return;
    }

    navigation.navigate("Login");
  };

  return (
    <>
      <View style={styles.container}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Display name"
              accessibilityLabel="Display name"
            />
          )}
          name="displayName"
        />
        {errors.displayName && <Text>Your name is required</Text>}

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

        <View style={styles.submitContainer}>
          <Button onPress={handleSubmit(onSubmit)} title="register" />
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
    justifyContent: "flex-start",
    flex: 1,
    padding: 10,
    width: "100%",
  },
  textContainer: {
    padding: 25,
    borderWidth: 5,
    marginBottom: 10,
    borderRadius: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 3,
    marginVertical: 4,
    fontSize: 20,
  },
  submitContainer: {
    width: "100%",
    marginTop: 12,
  },
});

export default Register;
