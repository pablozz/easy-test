import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "../navigation";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import { Urls } from "../constants/urls";
import { Controller, useForm } from "react-hook-form";

export type LoginProps = NativeStackScreenProps<RootStackParamList, "Login">;

type FormData = {
  email: string;
  password: string;
};

const Login = (props: LoginProps) => {
  const { navigation } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const response = await fetch(Urls.DEV_API + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    console.log({ token: response.jwt });
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 5,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
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
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Password"
            accessibilityLabel="Password"
          />
        )}
        name="password"
      />
      {errors.email && (
        <Text>Your password should be at least 5 characters long</Text>
      )}
      <Button onPress={handleSubmit(onSubmit)} title="login" />
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
  input: {
    borderWidth: 1,
    borderRadius: 3,
    marginVertical: 4,
    fontSize: 20,
  },
});

export default Login;
