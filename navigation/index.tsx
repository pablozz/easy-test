import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import { RootScreens } from "../constants/screens";
import { Test } from "../types/test";

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

export type RootStackParamList = {
  Home: undefined;
  SolveTest: Test;
  CreateTest: undefined;
  ViewCode: { code: string };
  EnterCode: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      {Object.values(RootScreens).map((screen) => (
        <Stack.Screen key={`screen-${screen.name}`} {...screen} />
      ))}
    </Stack.Navigator>
  );
}
