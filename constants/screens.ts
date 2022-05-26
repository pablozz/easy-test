import CreateTest from "../screens/CreateTest";
import EnterCode from "../screens/EnterCode";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import SolveTest from "../screens/SolveTest";
import ViewCode from "../screens/ViewCode";
import TestsList from "../screens/TestsList";
import TestReview from "../screens/TestReview";
import CreatedTestReview from "../screens/CreatedTestReview";

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
  LOGIN: {
    name: "Login",
    component: Login,
  },
  REGISTER: {
    name: "Register",
    component: Register,
  },
  TESTS_LIST: {
    name: "TestsList",
    component: TestsList,
  },
  TEST_REVIEW: {
    name: "TestReview",
    component: TestReview,
  },
  CREATED_TEST_REVIEW: {
    name: "CreatedTestReview",
    component: CreatedTestReview,
  },
};
