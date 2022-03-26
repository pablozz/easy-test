import CreateTest from "../screens/CreateTest";
import Home from "../screens/Home";
import SolveTest from "../screens/SolveTest";

type Screens = {
  [name: string]: any; // @TODO: add appropriate type
};

export const RootScreens: Screens = {
  HOME: {
    name: "Home",
    component: Home,
  },
  SOLVE_TEST: {
    name: "SolveTest",
    component: SolveTest,
  },
  CREATE_TEST: {
    name: "CreateTest",
    component: CreateTest,
  },
};
