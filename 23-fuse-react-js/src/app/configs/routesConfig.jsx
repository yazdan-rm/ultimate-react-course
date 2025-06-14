import FuseUtils from "@fuse/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import SignUpConfig from "../main/sign-up/SignUpConfig";
import SignOutConfig from "../main/sign-out/SignOutConfig";
import Error404Page from "../main/404/Error404Page";
import ExampleConfig from "../main/example/ExampleConfig";
import UniversityAppConfig from "../main/university/UniversityAppConfig.jsx";

const routeConfigs = [
  ExampleConfig,
  UniversityAppConfig,
  SignOutConfig,
  SignUpConfig,
];
/**
 * The routes of the application.
 */
const routes = [
  ...FuseUtils.generateRoutesFromConfigs(
    routeConfigs,
    settingsConfig.defaultAuth,
  ),
  {
    path: "/",
    element: <Navigate to="app/university" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: "loading",
    element: <FuseLoading />,
  },
  {
    path: "404",
    element: <Error404Page />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: "*",
    element: <Navigate to="404" />,
  },
];
export default routes;
