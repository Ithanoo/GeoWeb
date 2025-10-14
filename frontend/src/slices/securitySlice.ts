import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface SecurityState {
  apiKey: string;
  auditLogging: boolean;
}

const initialState: SecurityState = {
  apiKey: "",
  auditLogging: true
};

const securitySlice = createSlice({
  name: "security",
  initialState,
  reducers: {
    updateApiKey(state, action: PayloadAction<string>) {
      state.apiKey = action.payload;
    },
    toggleAuditLogging(state) {
      state.auditLogging = !state.auditLogging;
    }
  }
});

export const { updateApiKey, toggleAuditLogging } = securitySlice.actions;
export const selectSecurityState = (state: RootState) => state.security;

export default securitySlice.reducer;
