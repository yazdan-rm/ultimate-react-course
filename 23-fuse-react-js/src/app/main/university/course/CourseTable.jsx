import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import Paper from "@mui/material/Paper";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useTheme } from "@mui/styles";
import { AG_GRID_LOCALE_IR } from "@ag-grid-community/locale";
import { useLazyGetCoursesQuery } from "../UniversityApi.js";
import { useAppDispatch } from "app/store/hooks.js";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice.js";
import { getGenderText, toShamsiDate } from "../../../utils/UmsUtils.js";
import CourseStatus from "../../../utils/CourseStatus.jsx";

ModuleRegistry.registerModules([AllCommunityModule]);

function CourseTable() {
  const containerStyle = useMemo(() => ({ width: "100%", height: "52vh" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [trigger] = useLazyGetCoursesQuery();
  const dispatch = useAppDispatch();

  const localeText = useMemo(() => AG_GRID_LOCALE_IR, []);
  const userTheme = useTheme();

  const myTheme = themeQuartz.withParams({
    headerTextColor: "#fff",
    headerBackgroundColor: userTheme.palette.primary.main,
    oddRowBackgroundColor: userTheme.palette.background.default,
    headerColumnResizeHandleColor: userTheme.palette.primary.light,
    fontFamily: "yekan",
  });

  const theme = useMemo(() => {
    return myTheme;
  }, [userTheme]);

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "سطر",
      maxWidth: 60,
      valueGetter: "node.id",
      cellRenderer: (props) => {
        if (props.value !== undefined) {
          return props.value;
        } else {
          return (
            <img
              src="../../../../../public/assets/images/loading.gif"
              alt={"loader"}
            />
          );
        }
      },
    },
    { headerName: "کد دوره", field: "courseCode" },
    {
      headerName: "تاریخ ایجاد",
      field: "createDate",
      valueFormatter: (params) => toShamsiDate(params.value),
      sortable: true,
    },
    {
      headerName: "نام دوره",
      field: "courseName",
      minWidth: 200,
      sortable: true,
    },
    {
      headerName: "نام استاد",
      field: "instructorName",
      minWidth: 150,
      sortable: true,
    },
    { headerName: "ظرفیت دوره", field: "capacity" },
    { headerName: "تعداد واحد درس", field: "units" },
    {
      headerName: "جنسیت مجاز",
      field: "allowedGenders",
      valueFormatter: (params) => getGenderText(params.value),
    },
    { headerName: "مکان برگزاری", field: "location", minWidth: 200 },
    {
      headerName: "وضعیت دوره",
      field: "status",
      cellRenderer: (params) => <CourseStatus id={params.value} />,
      sortable: true,
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      sortable: false,
    };
  }, []);

  const onGridReady = useCallback(
    (params) => {
      const dataSource = {
        rowCount: undefined,
        getRows: async (gridParams) => {
          const size = gridParams.endRow - gridParams.startRow;
          const page = Math.floor(gridParams.startRow / size);
          const sortModel = gridParams.sortModel[0]; // AG Grid gives sort info here
          const sortField = sortModel?.colId;
          const sortDir = sortModel?.sort; // 'asc' or 'desc'
          console.log(sortModel, sortField, sortDir);

          const result = await trigger({
            pageNo: page,
            pageSize: size,
            sortField,
            sortDir,
          });

          if (!result.isError) {
            const { content, totalElements } = result.data.data;
            const lastRow =
              gridParams.endRow >= totalElements ? totalElements : -1;

            gridParams.successCallback(content, lastRow);
          } else {
            dispatch(
              showMessage({
                message: result.error.response.data.message,
                variant: "error",
              }),
            );
            gridParams.failCallback();
          }
        },
      };
      params.api.setGridOption("datasource", dataSource);
    },
    [trigger],
  );

  return (
    <Paper
      elevation={4}
      sx={{ m: 2, mb: 0, p: 2, width: "98%", overflow: "hidden" }}
    >
      <div style={containerStyle}>
        <div style={gridStyle}>
          <AgGridReact
            enableRtl={true}
            columnDefs={columnDefs}
            onGridReady={onGridReady}
            defaultColDef={defaultColDef}
            rowModelType={"infinite"}
            cacheOverflowSize={2}
            cacheBlockSize={20}
            paginationPageSize={20}
            maxConcurrentDatasourceRequests={2}
            infiniteInitialRowCount={1}
            maxBlocksInCache={2}
            pagination={true}
            // getRowId={getRowId}
            localeText={localeText}
            theme={theme}
            copySelectedRows={true}
            sort
          />
        </div>
      </div>
    </Paper>
  );
}

export default CourseTable;
