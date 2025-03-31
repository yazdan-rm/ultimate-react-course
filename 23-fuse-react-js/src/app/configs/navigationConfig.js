import i18next from "i18next";
import en from "./navigation-i18n/en";
import fa from "./navigation-i18n/fa";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("fa", "navigation", fa);
/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig = [
  {
    id: "courses",
    title: "Courses",
    subtitle: "فرایند های دوره های درسی",
    translate: "COURSES",
    type: "group",
    children: [
      {
        id: "courses.create",
        title: "Create",
        translate: "CREATE",
        type: "item",
        icon: "heroicons-outline:plus-circle",
        url: "/courses/create",
      },
      {
        id: "courses.create",
        title: "Create",
        translate: "CREATE",
        type: "item",
        icon: "heroicons-outline:plus-circle",
        url: "/courses/create",
      },
    ],
  },
];
export default navigationConfig;
