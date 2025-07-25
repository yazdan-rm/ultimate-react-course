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

  // Optional props
  masterId = null, // New optional prop for master-detail behavior
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
      textColor: userTheme.palette.text.secondary,
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
      filter: true,
      sortable: enableSorting,
    };
  }, []);

  useEffect(() => {
    gridRef?.current?.api?.paginationGoToPage(0);
    gridRef?.current?.api?.refreshInfiniteCache();
  }, [refreshGrid, masterId]);

  const finalColumnDefs = useMemo(() => {
    return [
      {
        headerName: "سطر",
        maxWidth: rowNumberColumnWidth,
        valueGetter: "node.id",
        sortable: false,
        filter: false,
        cellRenderer: (props) => {
          if (props.value !== undefined) {
            return props.value;
          } else {
            return (
              <img src="../../../assets/images/loading.gif" alt={"loader"} />
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
          const result = await fetchData({
            startRow: gridParams.startRow,
            endRow: gridParams.endRow,
            filterModel: gridParams.filterModel,
            sortModel: gridParams.sortModel,
            masterId, // Send masterId if available
          });

          if (!result.isError) {
            const { data, lastRow } = result.data.data;
            gridParams.successCallback(data, lastRow);
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
    [fetchData, masterId],
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
            tooltipShowDelay={100}
            tooltipHideDelay={2000}
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
