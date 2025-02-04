import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface RealEstateExperienceState {
  numPropertiesExited: number;
  isFormCompleted: boolean;
}


const initialState: RealEstateExperienceState = {
  numPropertiesExited: 0,
  isFormCompleted: false,
};

const realEstateExperienceSlice = createSlice({
  name: 'realEstateExperience',
  initialState,
  reducers: {
    updateField: <T extends keyof RealEstateExperienceState>(
      state: RealEstateExperienceState,
      action: PayloadAction<{ field: T; value: RealEstateExperienceState[T] }>
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
      console.log(`loanDetails' ${field} field updated to ${value} `)
    },

    markFormCompleted: (state: RealEstateExperienceState) => {
      console.log('Marking Real Estate Investment Experience form as completed');
      state.isFormCompleted = true;
    },
  },
});


export const { updateField, markFormCompleted } =
  realEstateExperienceSlice.actions;
export default realEstateExperienceSlice.reducer;
