import {
  useDeleteCourseScheduleMutation,
  useLazyGetPagedCourseScheduleQuery,
} from "../UniversityApi.js";
import { useAppDispatch, useAppSelector } from "app/store/hooks.js";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  refreshAgGrid,
  selectRefreshGridFlag,
  updateData,
} from "../universitySlice.js";
import { useParams } from "react-router-dom";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice.js";
import {
  getPersianDayOfWeek,
  toLocalTime,
  toShamsiDate,
} from "../../../utils/UmsUtils.js";
import AgGrid from "../../../utils/AgGrid.jsx";
import * as React from "react";
import Button from "@mui/material/Button";

function CourseScheduleTable() {
  const [trigger] = useLazyGetPagedCourseScheduleQuery();
  const refreshGrid = useAppSelector(selectRefreshGridFlag);
  const dispatch = useAppDispatch();
  const [deleteTrigger] = useDeleteCourseScheduleMutation();
  const { courseId } = useParams();

  const handleEdit = (data) => {
    dispatch(updateData(data));
  };

  const handleDelete = (data) => {
    deleteTrigger(data.id)
      .unwrap()
      .then((data) => {
        dispatch(showMessage({ message: data.message }));
      })
      .catch((e) =>
        dispatch(
          showMessage({ message: e.response.data.message, variant: "error" }),
        ),
      );
    setTimeout(() => dispatch(refreshAgGrid()), 500);
  };

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
      headerName: "روز ارائه",
      field: "dayOfWeek",
      valueFormatter: (params) => getPersianDayOfWeek(params.value),
      tooltipValueGetter: (params) => {
        return `${params.value}`;
      },
    },
    {
      headerName: "ساعت شروع ارائه",
      field: "courseStartTime",
      valueFormatter: (params) => toLocalTime(params.value),
      tooltipValueGetter: (params) => toLocalTime(params.value),
    },
    {
      headerName: "ساعت پایان ارائه",
      field: "courseEndTime",
      valueFormatter: (params) => toLocalTime(params.value),
      tooltipValueGetter: (params) => toLocalTime(params.value),
    },
    {
      headerName: "تاریخ امتحان",
      field: "courseExamDate",
      valueFormatter: (params) => toShamsiDate(params.value),
      tooltipValueGetter: (params) => toShamsiDate(params.value),
    },
    {
      headerName: "ساعت شروع امتحان",
      field: "courseExamTime",
      valueFormatter: (params) => toLocalTime(params.value),
      tooltipValueGetter: (params) => toLocalTime(params.value),
    },
    {
      headerName: "ویرایش",
      cellRenderer: (params) => (
        <Button type="button" onClick={() => handleEdit(params.data)}>
          <EditOutlinedIcon className="text-blue-500" fontSize="medium" />
        </Button>
      ),
      width: 30,
      sortable: false,
    },
    {
      headerName: "حذف",
      cellRenderer: (params) => (
        <Button type="button" onClick={() => handleDelete(params.data)}>
          <DeleteIcon className="text-red-500" fontSize="medium" />
        </Button>
      ),
      width: 30,
      sortable: false,
    },
  ];

  return (
    <AgGrid
      refreshGrid={refreshGrid}
      columnDefs={columnDefs}
      fetchData={trigger}
      masterId={courseId}
    />
  );
}

export default CourseScheduleTable;
