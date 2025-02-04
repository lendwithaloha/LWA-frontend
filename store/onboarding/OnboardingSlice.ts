import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OnboardingState {
  hasCompletedTour: boolean;
  showTour: boolean;
  currentStep: number;
}

const initialState: OnboardingState = {
  hasCompletedTour: false,
  showTour: false,
  currentStep: 0,
};

export const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setHasCompletedTour: (state, action: PayloadAction<boolean>) => {
      state.hasCompletedTour = action.payload;
    },
    setShowTour: (state, action: PayloadAction<boolean>) => {
      state.showTour = action.payload;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    resetTour: (state) => {
      state.showTour = false;
      state.currentStep = 0;
    },
  },
});

export const { setHasCompletedTour, setShowTour, setCurrentStep, resetTour } =
  onboardingSlice.actions;
export default onboardingSlice;
