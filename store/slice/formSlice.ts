import { createSlice, PayloadAction , current} from "@reduxjs/toolkit";

interface ComponentState {
  [key: string]: "complete" | "incomplete";
}

const initialState: ComponentState = {
  "/dashboard/loan/id/application/property-info": "incomplete",
  "/dashboard/loan/id/application/property-info/upload-current-lease-agreement": "complete",
  "/dashboard/loan/id/application/property-inspection-details": "incomplete", // Ensure this route is included
};

const componentSlice = createSlice({
  name: "componentState",
  initialState,
  reducers: {
    markComplete: (state, action: PayloadAction<string>) => {
      console.log("Before markComplete:", current(state));
      state[action.payload] = "complete";
      console.log("After markComplete:", current(state));
    },
    markIncomplete: (state, action: PayloadAction<string>) => {
      state[action.payload] = "incomplete";
    },
  },
});

export const { markComplete, markIncomplete } = componentSlice.actions;
export default componentSlice.reducer;
