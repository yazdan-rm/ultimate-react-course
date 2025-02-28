import i18next from "i18next";
import { lazy } from "react";
import en from "./i18n/en";
import tr from "./i18n/tr";
import ar from "./i18n/ar";
import fa from "./i18n/fa.js";

i18next.addResourceBundle("en", "examplePage", en);
i18next.addResourceBundle("tr", "examplePage", tr);
i18next.addResourceBundle("ar", "examplePage", ar);
i18next.addResourceBundle("fa", "examplePage", fa);
const Example = lazy(() => import("./Example"));
/**
 * The Example page config.
 */
const ExampleConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "example",
      element: <Example />,
    },
  ],
};
export default ExampleConfig;
