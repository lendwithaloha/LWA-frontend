import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CheckboxState {
  [key: string]: string;
}

const initialState: CheckboxState = {};

const checkboxSlice = createSlice({
  name: "checkbox",
  initialState,
  reducers: {
    setAnswer: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setAnswer } = checkboxSlice.actions;
export default checkboxSlice.reducer;
