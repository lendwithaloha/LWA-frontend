import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of the property details form
export interface PropertyDetailsState {
  address: string;
  propertyType: string;
  isOccupied: boolean;
  isPurchaseContractAccepted: boolean;
  contactEndDate: string;
  isFormCompleted: boolean;
  isApplicationSubmitted: boolean;
}

// Initial state with default values
const initialState: PropertyDetailsState = {
  address: '22038 Ocean Avenue, Torrance, CA 90503-6947',
  propertyType: 'Single-Family Home',
  isOccupied: false, // default value for "Do you plan to occupy the property?"
  isPurchaseContractAccepted: true, // default value for "Accepted Purchase Contract?"
  contactEndDate: '02/21/2024',
  isFormCompleted: false,
  isApplicationSubmitted: false,
};

const propertyDetailsSlice = createSlice({
  name: 'propertyDetails',
  initialState,
  reducers: {
    updateField: <T extends keyof PropertyDetailsState>(
      state: PropertyDetailsState,
      action: PayloadAction<{ field: T; value: PropertyDetailsState[T] }>
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
      console.log(`propertyDetails' ${field} field updated to ${value}`);
    },

    markFormCompleted: (state: PropertyDetailsState) => {
      console.log('Marking Property Details form as completed');
      state.isFormCompleted = true;
    },
  },
});

// Export actions and reducer
export const { updateField, markFormCompleted } = propertyDetailsSlice.actions;
export default propertyDetailsSlice.reducer;
