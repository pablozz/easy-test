import CreateTest from "../screens/CreateTest";
import EnterCode from "../screens/EnterCode";
import Home from "../screens/Home";
import SolveTest from "../screens/SolveTest";
import ViewCode from "../screens/ViewCode";

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
  VIEW_CODE: {
    name: "ViewCode",
    component: ViewCode,
  },
  ENTER_CODE: {
    name: "EnterCode",
    component: EnterCode,
  },
};
