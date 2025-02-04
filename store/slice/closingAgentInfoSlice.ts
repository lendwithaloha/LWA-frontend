import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state structure for Closing Agent Info
interface ClosingAgentInfoState {
  contactName: string;
  contactPhone: string;
  contactEmail: string;
}

const initialState: ClosingAgentInfoState = {
  contactName: 'Teresa Pasak',
  contactPhone: '703-689-3536',
  contactEmail: 'tmaciod@macciotitle.com',
};

const closingAgentInfoSlice = createSlice({
  name: 'closingAgentInfo',
  initialState,
  reducers: {
    // Action to update the closing agent information
    updateClosingAgentInfo: (
      state,
      action: PayloadAction<ClosingAgentInfoState>
    ) => {
      state.contactName = action.payload.contactName;
      state.contactPhone = action.payload.contactPhone;
      state.contactEmail = action.payload.contactEmail;
    },
  },
});

export const { updateClosingAgentInfo } = closingAgentInfoSlice.actions;
export default closingAgentInfoSlice.reducer;
