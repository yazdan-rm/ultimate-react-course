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
    id: "dashboard",
    title: "Dashboard",
    translate: "داشبورد",
    type: "item",
    icon: "heroicons-solid:clipboard-list",
    url: "/",
  },
  {
    id: "courses",
    title: "Courses",
    subtitle: "فرایند های دوره های درسی",
    translate: "COURSES",
    type: "group",
    auth: ["admin"],
    children: [
      {
        id: "courses-create",
        title: "Create New Course",
        translate: "CREATE_NEW_COURSE",
        type: "item",
        icon: "heroicons-solid:plus-circle",
        url: "/app/university/course",
      },
    ],
  },
];
export default navigationConfig;
