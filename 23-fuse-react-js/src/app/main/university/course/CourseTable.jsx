import * as React from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useLazyGetPagedCoursesQuery } from "../UniversityApi.js";
import {
  getEducationalLevelText,
  getGenderText,
  getSemesterTitleByCode,
  toShamsiDate,
} from "../../../utils/UmsUtils.js";
import AgGrid from "../../../utils/AgGrid.jsx";
import { useAppSelector } from "app/store/hooks.js";
import { selectRefreshGridFlag } from "../universitySlice.js";
import ActionButtons from "./ActionButtons.jsx";

ModuleRegistry.registerModules([AllCommunityModule]);

function CourseTable() {
  const [trigger] = useLazyGetPagedCoursesQuery();
  const refreshGrid = useAppSelector(selectRefreshGridFlag);

  const columnDefs = [
    {
      headerName: "تاریخ ایجاد",
      field: "createDate",
      valueFormatter: (params) => toShamsiDate(params.value),
      tooltipValueGetter: (params) => {
        return `${params.value}`;
      },
    },
    {
      headerName: "نام دوره",
      field: "courseName",
      minWidth: 150,
      tooltipValueGetter: (params) => {
        return `${params.value}`;
      },
    },
    {
      headerName: "مقطع تحصیلی",
      field: "educationalLevel",
      minWidth: 150,
      valueFormatter: (params) => getEducationalLevelText(params.value),
      tooltipValueGetter: (params) => {
        return `${params.value}`;
      },
    },
    {
      headerName: "نام استاد",
      field: "instructorName",
      minWidth: 150,
      tooltipValueGetter: (params) => {
        return `${params.value}`;
      },
    },
    { headerName: "ظرفیت دوره", field: "capacity" },
    {
      headerName: "تعداد واحد درس",
      field: "units",
      minWidth: 120,
    },
    {
      headerName: "جنسیت مجاز",
      field: "allowedGenders",
      valueFormatter: (params) => getGenderText(params.value),
    },
    {
      headerName: "مکان برگزاری",
      field: "location",
      minWidth: 100,
      tooltipValueGetter: (params) => {
        return `${params.value}`;
      },
    },
    {
      headerName: "عملیات ها",
      cellRenderer: (params) => <ActionButtons data={params.data} />,
      pinned: "left",
      width: 30,
      sortable: false,
    },
    {
      headerName: "نیم سال تحصیلی",
      field: "semester",
      minWidth: 170,
      valueFormatter(params) {
        return getSemesterTitleByCode(params.value);
      },
      tooltipValueGetter: (params) => {
        return getSemesterTitleByCode(params.value);
      },
    },
    {
      headerName: "دانشکده",
      field: "college",
      minWidth: 100,
      tooltipValueGetter: (params) => {
        return `${params.value}`;
      },
    },
    {
      headerName: "گروه آموزشی",
      field: "department",
      minWidth: 100,
      tooltipValueGetter: (params) => {
        return `${params.value}`;
      },
    },
    {
      headerName: "رشته تحصیلی",
      field: "fieldOfStudy",
      minWidth: 150,
      tooltipValueGetter: (params) => {
        return `${params.value}`;
      },
    },
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
