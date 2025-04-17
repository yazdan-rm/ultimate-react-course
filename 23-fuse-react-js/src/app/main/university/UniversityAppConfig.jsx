import UniversityApp from "./UniversityApp.jsx";
import Course from "./course/Course.jsx";
import CoursePrerequisites from "./coursePrerequisites/CoursePrerequisites.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";

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
        {
          path: "course/:courseId",
          element: <CoursePrerequisites />,
        },
      ],
    },
  ],
};

export default UniversityAppConfig;
