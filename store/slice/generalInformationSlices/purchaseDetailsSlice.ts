import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PurchaseDetailState {
  saleType: string;
  rehabAmountRequested: string;
  totalCost: string;
  estimatedDays: number;
  exitStrategy: string;
  isApplicationSubmitted:boolean;
  isFormCompleted:boolean
}

const initialState: PurchaseDetailState = {
  saleType: '',
  rehabAmountRequested: '$134,200',
  totalCost: '$134,240',
  estimatedDays: 120,
  exitStrategy: 'Rehab and sell',
  isApplicationSubmitted:false,
  isFormCompleted:false
};

const purchaseDetailSlice = createSlice({
  name: 'purchaseDetail',
  initialState,
  reducers: {
    updateField: <T extends keyof PurchaseDetailState>(
      state: PurchaseDetailState,
      action: PayloadAction<{ field: T; value: PurchaseDetailState[T] }>
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
      console.log(`loanDetails' ${field} field updated to ${value} `)
    },

    markFormCompleted: (state: PurchaseDetailState) => {
      console.log('Marking Loan Details form as completed');
      state.isFormCompleted = true;
    },
  },
});

export const { updateField,markFormCompleted } = purchaseDetailSlice.actions;

export default purchaseDetailSlice.reducer;
