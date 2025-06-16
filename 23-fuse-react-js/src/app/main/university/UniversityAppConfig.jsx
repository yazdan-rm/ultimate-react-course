import { lazy } from "react";

const UniversityApp = lazy(() => import("./UniversityApp.jsx"));
const Dashboard = lazy(() => import("./dashboard/Dashboard.jsx"));
const Course = lazy(() => import("./course/Course.jsx"));
const CoursePrerequisites = lazy(
  () => import("./coursePrerequisites/CoursePrerequisites.jsx"),
);
const CourseSchedule = lazy(
  () => import("./courseSchedule/CourseSchedule.jsx"),
);
const MainCourseEnrollment = lazy(
  () => import("./courseEnrollment/./MainCourseEnrollment"),
);
const ExclusiveCoursesForStudent = lazy(
  () =>
    import(
      "./reports/exclusiveCoursesForStudent/ExclusiveCoursesForStudent.jsx"
    ),
);
const StudentEnrollmentResult = lazy(
  () => import("./reports/studentEnrollmentResult/StudentEnrollmentResult.jsx"),
);

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
          path: "course/course-prerequisites/:courseId",
          element: <CoursePrerequisites />,
        },
        {
          path: "course/course-schedules/:courseId",
          element: <CourseSchedule />,
        },
        {
          path: "course-enrollment/main-enrollment",
          element: <MainCourseEnrollment />,
        },
        {
          path: "reports/exclusive-courses-for-student",
          element: <ExclusiveCoursesForStudent />,
        },
        {
          path: "reports/student-enrollment-result",
          element: <StudentEnrollmentResult />,
        },
      ],
    },
  ],
};

export default UniversityAppConfig;
