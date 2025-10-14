import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface FilterOption {
  id: string;
  label: string;
  type: "range" | "select" | "toggle";
  value: unknown;
}

interface FilterState {
  filters: FilterOption[];
}

const initialState: FilterState = {
  filters: []
};

export const initializeFilters = createAsyncThunk("filters/initialize", async () => {
  return [
    { id: "elevation", label: "Altitude", type: "range", value: [0, 8848] },
    { id: "pollution", label: "Pollution", type: "toggle", value: false }
  ] satisfies FilterOption[];
});

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateFilter(state, action: PayloadAction<FilterOption>) {
      state.filters = state.filters.map((filter) =>
        filter.id === action.payload.id ? action.payload : filter
      );
    }
  },
  extraReducers: (builder) => {
    builder.addCase(initializeFilters.fulfilled, (state, action) => {
      state.filters = action.payload;
    });
  }
});

export const { updateFilter } = filterSlice.actions;
export const selectFilters = (state: RootState) => state.filters.filters;

export default filterSlice.reducer;
