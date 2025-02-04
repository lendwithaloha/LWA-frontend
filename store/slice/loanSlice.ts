// src/redux/loanSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Loan {
  id: string;
  name: string;
  status: string;
  type: string;
  amount: number;
  submissionDate: string;
  closingDate: string;
}

interface LoanState {
  loans: Loan[];
}

const initialState: LoanState = {
  loans: [],
};

const loanSlice = createSlice({
  name: 'loans',
  initialState,
  reducers: {
    setLoans: (state, action: PayloadAction<Loan[]>) => {
      state.loans = action.payload;
    },
  },
});

export const { setLoans } = loanSlice.actions;

export default loanSlice.reducer;
