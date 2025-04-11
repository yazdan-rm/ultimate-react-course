import { createSlice } from "@reduxjs/toolkit";
import { rootReducer } from "app/store/lazyLoadedSlices.js";

const initialState = {
  data: {},
  refreshGrid: false,
  isLoading: false,
  isError: false,
};

export const universitySlice = createSlice({
  name: "university",
  initialState,
  reducers: {
    refreshAgGrid(state) {
      state.refreshGrid = !state.refreshGrid;
    },
    updateData(state, action) {
      state.data = action.payload;
    },
  },
  selectors: {
    selectRefreshGridFlag: (state) => state.refreshGrid,
    selectDataObject: (state) => state.data,
  },
});

rootReducer.inject(universitySlice);
const injectedSlice = universitySlice.injectInto(rootReducer);

export const { refreshAgGrid, updateData } = universitySlice.actions;

export default universitySlice.reducer;

export const { selectRefreshGridFlag, selectDataObject } =
  injectedSlice.selectors;
