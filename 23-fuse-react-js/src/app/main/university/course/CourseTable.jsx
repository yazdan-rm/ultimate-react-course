import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import Paper from "@mui/material/Paper";
import {
  InfiniteRowModelModule,
  LocaleModule,
  ModuleRegistry,
  PaginationModule,
  themeQuartz,
  ValidationModule,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useTheme } from "@mui/styles";
import { AG_GRID_LOCALE_IR } from "@ag-grid-community/locale";

ModuleRegistry.registerModules([
  InfiniteRowModelModule,
  PaginationModule,
  ValidationModule,
  LocaleModule,
]);

function CourseTable() {
  const containerStyle = useMemo(() => ({ width: "100%", height: "52vh" }), []);
  const gridStyle = useMemo(
    () => ({ height: "100%", width: "100%", dir: "rtl" }),
    [],
  );

  const localeText = useMemo(() => AG_GRID_LOCALE_IR, []);
  const userTheme = useTheme();

  const myTheme = themeQuartz.withParams({
    headerTextColor: "#fff",
    headerBackgroundColor: userTheme.palette.primary.main,
    oddRowBackgroundColor: userTheme.palette.background.default,
    headerColumnResizeHandleColor: userTheme.palette.primary.light,
  });

  const theme = useMemo(() => {
    return myTheme;
  }, [userTheme]);

  const [columnDefs, setColumnDefs] = useState([
    // this row shows the row index, doesn't use any data from the row
    {
      headerName: "ID",
      maxWidth: 100,
      // it is important to have node.id here, so that when the id changes (which happens
      // when the row is loaded) then the cell is refreshed.
      valueGetter: "node.id",
      cellRenderer: (props) => {
        if (props.value !== undefined) {
          return props.value;
        } else {
          return (
            <img
              src="https://www.ag-grid.com/example-assets/loading.gif"
              alt={"loader"}
            />
          );
        }
      },
    },
    { field: "athlete", minWidth: 150 },
    { field: "age" },
    { field: "country", minWidth: 150 },
    { field: "year" },
    { field: "date", minWidth: 150 },
    { field: "sport", minWidth: 150 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      sortable: false,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => {
        const dataSource = {
          rowCount: undefined,
          getRows: (params) => {
            console.log(
              "asking for " + params.startRow + " to " + params.endRow,
            );
            // At this point in your code, you would call the server.
            // To make the demo look real, wait for 500ms before returning
            setTimeout(function () {
              // take a slice of the total rows
              const rowsThisPage = data.slice(params.startRow, params.endRow);
              // if on or after the last page, work out the last row.
              let lastRow = -1;
              if (data.length <= params.endRow) {
                lastRow = data.length;
              }
              // call the success callback
              params.successCallback(rowsThisPage, lastRow);
            }, 500);
          },
        };
        params.api.setGridOption("datasource", dataSource);
      });
  }, []);

  return (
    <Paper
      elevation={4}
      sx={{ m: 2, mb: 0, p: 2, width: "98%", overflow: "hidden" }}
    >
      <div style={containerStyle}>
        <div style={gridStyle}>
          <AgGridReact
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowBuffer={0}
            rowModelType={"infinite"}
            cacheBlockSize={100}
            cacheOverflowSize={2}
            maxConcurrentDatasourceRequests={1}
            infiniteInitialRowCount={1000}
            maxBlocksInCache={10}
            pagination={true}
            // getRowId={getRowId}
            onGridReady={onGridReady}
            theme={theme}
            localeText={localeText}
          />
        </div>
      </div>
    </Paper>
  );
}

export default CourseTable;
