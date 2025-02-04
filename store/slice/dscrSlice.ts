// src/store/slice/dscrCalculatorSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state for the DSCR calculator form
export interface DSCRCalculatorState {
  rentalIncome: number;
  insurance: number;
  taxes: number;
  hoaFee: number;
  principalInterest: number;
  loanAmount: number;
  leverage: number;
  dscr: number;
  isCompleted: boolean;
}

// Initial state with default values
const initialState: DSCRCalculatorState = {
  rentalIncome: 1873,
  insurance: 980,
  taxes: 1092,
  hoaFee: 0,
  principalInterest: 1432.57,
  loanAmount: 210000,
  leverage: 75.0,
  dscr: 0, // Will be calculated
  isCompleted: false,
};

const dscrCalculatorSlice = createSlice({
  name: 'dscrCalculator',  // Ensure the slice name is 'dscrCalculator'
  initialState,
  reducers: {
    updateField: <T extends keyof DSCRCalculatorState>(
      state: DSCRCalculatorState,
      action: PayloadAction<{ field: T; value: DSCRCalculatorState[T] }>
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    
    calculateDSCR: (state: DSCRCalculatorState) => {
      const totalExpenses = state.insurance + state.taxes + state.hoaFee;
      state.dscr = state.rentalIncome / (state.principalInterest + totalExpenses);
    },
    
    markComplete: (state: DSCRCalculatorState) => {
      console.log('Marking DSCR calculator as complete'); 
      state.isCompleted = true; // Mark as completed
    },
  },
});

export const { updateField, calculateDSCR, markComplete } = dscrCalculatorSlice.actions;
export default dscrCalculatorSlice.reducer;
