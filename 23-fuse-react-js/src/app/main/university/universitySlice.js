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
    updateAgGrid(state) {
      state.refreshGrid = !state.refreshGrid;
    },
  },
  selectors: {
    selectRefreshGridFlag: (state) => state.refreshGrid,
  },
});

rootReducer.inject(universitySlice);
const injectedSlice = universitySlice.injectInto(rootReducer);

export const { updateAgGrid } = universitySlice.actions;

export default universitySlice.reducer;

export const { selectRefreshGridFlag } = injectedSlice.selectors;
