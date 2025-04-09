import * as React from "react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import Paper from "@mui/material/Paper";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useTheme } from "@mui/styles";
import { AG_GRID_LOCALE_IR } from "@ag-grid-community/locale";
import { useAppDispatch } from "app/store/hooks.js";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice.js";

ModuleRegistry.registerModules([AllCommunityModule]);

const AgGrid = ({
  // Required props
  fetchData, // Function to fetch data (should return a promise)
  columnDefs, // Array of column definitions

  // Optional props with defaults
  refreshGrid,
  containerStyle = { width: "100%", height: "52vh" },
  gridStyle = { height: "100%", width: "100%" },
  pageSize = 20,
  cacheBlockSize = 20,
  maxBlocksInCache = 2,
  rowNumberColumnWidth = 60,
  enableRtl = true,
  enableSorting = true,
  enablePagination = true,
  localeText = AG_GRID_LOCALE_IR,
}) => {
  const userTheme = useTheme();
  const dispatch = useAppDispatch();
  const gridRef = useRef(null);
  const theme = useMemo(() => {
    return themeQuartz.withParams({
      headerTextColor: "#fff",
      headerBackgroundColor: userTheme.palette.primary.main,
      oddRowBackgroundColor: userTheme.palette.background.default,
      headerColumnResizeHandleColor: userTheme.palette.primary.light,
      fontFamily: "yekan",
    });
  }, [userTheme]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      sortable: enableSorting,
    };
  }, []);

  useEffect(() => {
    gridRef?.current?.api?.paginationGoToPage(0);
    gridRef?.current?.api?.refreshInfiniteCache();
  }, [refreshGrid]);

  // Add row number column if enabled
  const finalColumnDefs = useMemo(() => {
    return [
      {
        headerName: "سطر",
        maxWidth: rowNumberColumnWidth,
        valueGetter: "node.id",
        sortable: false,
        cellRenderer: (props) => {
          if (props.value !== undefined) {
            return props.value;
          } else {
            return (
              <img
                src="../../../public/assets/images/loading.gif"
                alt={"loader"}
              />
            );
          }
        },
      },
      ...columnDefs,
    ];
  }, [columnDefs, rowNumberColumnWidth]);

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

          const result = await fetchData({
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
    [fetchData],
  );

  return (
    <Paper
      elevation={4}
      sx={{ m: 2, mb: 0, p: 2, width: "98%", overflow: "hidden" }}
    >
      <div style={containerStyle}>
        <div style={gridStyle}>
          <AgGridReact
            ref={gridRef}
            enableRtl={enableRtl}
            columnDefs={finalColumnDefs}
            onGridReady={onGridReady}
            defaultColDef={defaultColDef}
            rowModelType={"infinite"}
            cacheOverflowSize={2}
            cacheBlockSize={cacheBlockSize}
            paginationPageSize={pageSize}
            maxConcurrentDatasourceRequests={2}
            infiniteInitialRowCount={1}
            maxBlocksInCache={maxBlocksInCache}
            pagination={enablePagination}
            localeText={localeText}
            theme={theme}
          />
        </div>
      </div>
    </Paper>
  );
};

export default AgGrid;
