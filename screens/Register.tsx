import React from "react";
import { RootStackParamList } from "../navigation";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Urls } from "../constants/urls";

export type RegisterProps = NativeStackScreenProps<
  RootStackParamList,
  "Register"
>;

type FormData = {
  displayName: string;
  email: string;
  password: string;
};

const Register = (props: RegisterProps) => {
  const { navigation } = props;

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
    }).then((res) => res.ok);
    if (response) {
      navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
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

      <Button onPress={handleSubmit(onSubmit)} title="register" />
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

export default Register;
