import UniversityApp from "./UniversityApp.jsx";
import Course from "./course/Course.jsx";

const UniversityAppConfig = {
  routes: [
    {
      path: "app/university",
      element: <UniversityApp />,
      children: [
        {
          path: "course",
          element: <Course />,
          auth: ["admin"],
        },
      ],
    },
  ],
};

export default UniversityAppConfig;
