import * as React from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useLazyGetCoursesQuery } from "../UniversityApi.js";
import { getGenderText, toShamsiDate } from "../../../utils/UmsUtils.js";
import CourseStatus from "../../../utils/CourseStatus.jsx";
import AgGrid from "../../../utils/AgGrid.jsx";
import { useAppSelector } from "app/store/hooks.js";
import { selectRefreshGridFlag } from "../universitySlice.js";

ModuleRegistry.registerModules([AllCommunityModule]);

function CourseTable() {
  const [trigger] = useLazyGetCoursesQuery();
  const refreshGrid = useAppSelector(selectRefreshGridFlag);

  const columnDefs = [
    {
      headerName: "وضعیت دوره",
      field: "status",
      cellRenderer: (params) => <CourseStatus id={params.value} />,
    },
    { headerName: "کد دوره", field: "courseCode" },
    {
      headerName: "تاریخ ایجاد",
      field: "createDate",
      valueFormatter: (params) => toShamsiDate(params.value),
    },
    {
      headerName: "نام دوره",
      field: "courseName",
      minWidth: 200,
    },
    {
      headerName: "نام استاد",
      field: "instructorName",
      minWidth: 150,
    },
    { headerName: "ظرفیت دوره", field: "capacity" },
    { headerName: "تعداد واحد درس", field: "units" },
    {
      headerName: "جنسیت مجاز",
      field: "allowedGenders",
      valueFormatter: (params) => getGenderText(params.value),
    },
    { headerName: "مکان برگزاری", field: "location", minWidth: 200 },
  ];

  return (
    <AgGrid
      refreshGrid={refreshGrid}
      columnDefs={columnDefs}
      fetchData={trigger}
    />
  );
}

export default CourseTable;
