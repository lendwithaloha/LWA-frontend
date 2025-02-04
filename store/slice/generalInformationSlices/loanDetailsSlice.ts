import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface LoanDetailsState {
  loanPurpose: string;
  purchasePrice: number;
  propertyValueAsIs: number;
  isRehabFundRequested: boolean;
  rehabAmount: number;
  propertyValueAfterRepair: number | null;
  sellerConcessions: number | null;
  assignmentFees: number | null;
  isFormCompleted: boolean;
  isApplicationSubmitted:boolean
}

// Initial state with default values
const initialState: LoanDetailsState = {
  loanPurpose: 'New Purchase',
  purchasePrice: 1000000,
  propertyValueAsIs: 1050000,
  isRehabFundRequested: true, 
  rehabAmount: 134200,
  propertyValueAfterRepair: 1500000,
  sellerConcessions: 0,
  assignmentFees: 50000,
  isFormCompleted: false,
  isApplicationSubmitted:false,
};

const loanDetailsSlice = createSlice({
  name: 'loanDetails',
  initialState,
  reducers: {
    updateField: <T extends keyof LoanDetailsState>(
      state: LoanDetailsState,
      action: PayloadAction<{ field: T; value: LoanDetailsState[T] }>
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
      console.log(`loanDetails' ${field} field updated to ${value} `)
    },

    markFormCompleted: (state: LoanDetailsState) => {
      console.log('Marking Loan Details form as completed');
      state.isFormCompleted = true
    },
  },
});

// Export actions and reducer
export const { updateField, markFormCompleted } = loanDetailsSlice.actions;
export default loanDetailsSlice.reducer;

