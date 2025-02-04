import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface valuationDeliveryAcknowledgementState {
  acknowledgedECOAValuationRule:boolean;
  isFormCompleted: boolean;
  isApplicationSubmitted: boolean;
}

const initialState: valuationDeliveryAcknowledgementState = {
  acknowledgedECOAValuationRule:false,
  isFormCompleted: false,
  isApplicationSubmitted: false,
};

const projectSummarySlice = createSlice({
  name: 'valuationDeliveryAcknowledgement',
  initialState,
  reducers: {
    updateField: <T extends keyof valuationDeliveryAcknowledgementState>(
      state: valuationDeliveryAcknowledgementState,
      action: PayloadAction<{ fieldName: T; value: valuationDeliveryAcknowledgementState[T] }>
    ) => {
      const { fieldName, value } = action.payload;
      state[fieldName] = value;
      console.log(`'valuationDeliveryAcknowledgement' ${fieldName} field updated to ${value}`);
    },
    markFormCompleted: (state: valuationDeliveryAcknowledgementState) => {
      console.log('Marking valuationDeliveryAcknowledgement form as completed');
      state.isFormCompleted = true;
    },
  },
});

export const { updateField, markFormCompleted } = projectSummarySlice.actions;
export default projectSummarySlice.reducer;
