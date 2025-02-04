import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ClosingAgentState {
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  alertVisible: boolean;
}

const initialState: ClosingAgentState = {
  contactName: "John Doe",
  contactPhone: "(123) 456-7890",
  contactEmail: "john.doe@example.com",
  alertVisible: false,
};

const closingAgentSlice = createSlice({
  name: "closingAgent",
  initialState,
  reducers: {
    updateContactInfo: (
      state,
      action: PayloadAction<{
        name: string;
        phone: string;
        email: string;
      }>
    ) => {
      state.contactName = action.payload.name;
      state.contactPhone = action.payload.phone;
      state.contactEmail = action.payload.email;
    },
    toggleAlert: (state, action: PayloadAction<boolean>) => {
      state.alertVisible = action.payload;
    },
  },
});

export const { updateContactInfo, toggleAlert } = closingAgentSlice.actions;

export default closingAgentSlice.reducer;
