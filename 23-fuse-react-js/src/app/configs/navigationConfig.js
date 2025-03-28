import i18next from "i18next";
import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";
import fa from "./navigation-i18n/fa";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);
i18next.addResourceBundle("fa", "navigation", fa);
/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig = [
  {
    id: "example-component",
    title: "Example",
    translate: "EXAMPLE",
    type: "item",
    icon: "heroicons-outline:academic-cap",
    url: "example",
  },
];
export default navigationConfig;
