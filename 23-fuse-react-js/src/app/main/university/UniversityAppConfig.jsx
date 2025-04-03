import UniversityApp from "./UniversityApp.jsx";
import Course from "./course/Course.jsx";
import Dashboard from "./Dashboard.jsx";

const UniversityAppConfig = {
  routes: [
    {
      path: "app/university",
      element: <UniversityApp />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "course",
          element: <Course />,
        },
      ],
    },
  ],
};

export default UniversityAppConfig;
