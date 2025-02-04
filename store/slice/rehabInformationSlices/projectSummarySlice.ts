import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProjectSummaryState {
  projectDescription: string;
  targetQuality: string;
  propertyOccupied: boolean;
  currentAboveGroundSqFt: number;
  currentAboveGroundBedrooms: number;
  currentAboveGroundBathrooms: number;
  currentAboveGroundLivingrooms: number;
  currentBelowGroundSqFt: number;
  currentBelowGroundBedrooms: number;
  currentBelowGroundBathrooms: number;
  currentBelowGroundLivingrooms: number;
  rehabbedAboveGroundSqFt: number;
  rehabbedAboveGroundBedrooms: number;
  rehabbedAboveGroundBathrooms: number;
  rehabbedAboveGroundLivingrooms: number;
  rehabbedBelowGroundSqFt: number;
  rehabbedBelowGroundBedrooms: number;
  rehabbedBelowGroundBathrooms: number;
  rehabbedBelowGroundLivingrooms: number;
  isFormCompleted: boolean;
  isApplicationSubmitted: boolean;
}

const initialState: ProjectSummaryState = {
  projectDescription: 'General rehab of a SFR. Making renovations to the Bathrooms, Kitchens, updating the electrical and HVAC units.',
  targetQuality: 'Custom/High',
  propertyOccupied: false,
  currentAboveGroundSqFt: 1415,
  currentAboveGroundBedrooms: 3,
  currentAboveGroundBathrooms: 2,
  currentAboveGroundLivingrooms: 1,
  currentBelowGroundSqFt: 0, // Defaulting to 0
  currentBelowGroundBedrooms: 0,
  currentBelowGroundBathrooms: 0,
  currentBelowGroundLivingrooms: 0,
  rehabbedAboveGroundSqFt: 1415,
  rehabbedAboveGroundBedrooms: 3,
  rehabbedAboveGroundBathrooms: 2,
  rehabbedAboveGroundLivingrooms: 1,
  rehabbedBelowGroundSqFt: 0, // Defaulting to 0
  rehabbedBelowGroundBedrooms: 0,
  rehabbedBelowGroundBathrooms: 0,
  rehabbedBelowGroundLivingrooms: 0,
  isFormCompleted: false,
  isApplicationSubmitted: false,
};

const projectSummarySlice = createSlice({
  name: 'projectSummary',
  initialState,
  reducers: {
    updateField: <T extends keyof ProjectSummaryState>(
      state: ProjectSummaryState,
      action: PayloadAction<{ fieldName: T; value: ProjectSummaryState[T] }>
    ) => {
      const { fieldName, value } = action.payload;
      state[fieldName] = value;
      console.log(`'projectSummary' ${fieldName} field updated to ${value}`);
    },
    markFormCompleted: (state: ProjectSummaryState) => {
      console.log('Marking Project Summary form as completed');
      state.isFormCompleted = true;
    },
  },
});

export const { updateField, markFormCompleted } = projectSummarySlice.actions;
export default projectSummarySlice.reducer;
