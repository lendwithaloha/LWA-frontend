import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HoldbackProcessState {
  acceptedLendHoldbackProcess:boolean;
  isFormCompleted: boolean;
  isApplicationSubmitted: boolean;
}

const initialState: HoldbackProcessState = {
  acceptedLendHoldbackProcess:false,
  isFormCompleted: false,
  isApplicationSubmitted: false,
};

const projectSummarySlice = createSlice({
  name: 'projectSummary',
  initialState,
  reducers: {
    updateField: <T extends keyof HoldbackProcessState>(
      state: HoldbackProcessState,
      action: PayloadAction<{ fieldName: T; value: HoldbackProcessState[T] }>
    ) => {
      const { fieldName, value } = action.payload;
      state[fieldName] = value;
      console.log(`'projectSummary' ${fieldName} field updated to ${value}`);
    },
    markFormCompleted: (state: HoldbackProcessState) => {
      console.log('Marking Project Summary form as completed');
      state.isFormCompleted = true;
    },
  },
});

export const { updateField, markFormCompleted } = projectSummarySlice.actions;
export default projectSummarySlice.reducer;
