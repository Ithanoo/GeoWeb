import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchLayers } from "../services/layerService";
import { Layer } from "../types/layer";

interface LayerState {
  layers: Layer[];
  status: "idle" | "loading" | "failed";
}

const initialState: LayerState = {
  layers: [],
  status: "idle"
};

export const initializeLayers = createAsyncThunk("layers/initialize", async () => {
  const response = await fetchLayers();
  return response;
});

const layerSlice = createSlice({
  name: "layers",
  initialState,
  reducers: {
    toggleLayer(state, action: PayloadAction<string>) {
      state.layers = state.layers.map((layer) =>
        layer.id === action.payload ? { ...layer, active: !layer.active } : layer
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeLayers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(initializeLayers.fulfilled, (state, action) => {
        state.status = "idle";
        state.layers = action.payload;
      })
      .addCase(initializeLayers.rejected, (state) => {
        state.status = "failed";
      });
  }
});

export const { toggleLayer } = layerSlice.actions;

export const selectLayers = (state: RootState) => state.layers.layers;
export const selectActiveLayers = (state: RootState) =>
  state.layers.layers.filter((layer) => layer.active);

export default layerSlice.reducer;
