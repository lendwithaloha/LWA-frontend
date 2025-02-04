// src/store/slice/propertyImprovementSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for your form state
export interface PropertyImprovementState {
  hasMadeImprovements: string | null; // Can be 'Yes', 'No', or null (initially no selection)
}

const initialState: PropertyImprovementState = {
  hasMadeImprovements: null, // Initial state with no selection
};

const propertyImprovementSlice = createSlice({
  name: 'propertyImprovement',
  initialState,
  reducers: {
    setImprovements: (state, action: PayloadAction<string>) => {
      state.hasMadeImprovements = action.payload;
    },
    markComplete: (state, action: PayloadAction<string>) => {
      console.log(`Marking ${action.payload} as complete`);
      // You can add additional logic here when the task is marked as complete
    },
  },
});

export const { setImprovements, markComplete } = propertyImprovementSlice.actions;

export default propertyImprovementSlice.reducer;
