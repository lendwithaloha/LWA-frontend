import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileSetupState {
  currentStep: number;
  totalSteps: number;
}

const initialState: ProfileSetupState = {
  currentStep: 0,
  totalSteps: 5, // Adjust based on the number of steps
};

const profileSetupSlice = createSlice({
  name: "profileSetup",
  initialState,
  reducers: {
    nextStep(state) {
      if (state.currentStep < state.totalSteps) {
        state.currentStep += 1;
      }
    },
    previousStep(state) {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    setStep(state, action: PayloadAction<number>) {
      if (action.payload >= 1 && action.payload <= state.totalSteps) {
        state.currentStep = action.payload;
      }
    },
  },
});

export const { nextStep, previousStep, setStep } = profileSetupSlice.actions;
export default profileSetupSlice;
