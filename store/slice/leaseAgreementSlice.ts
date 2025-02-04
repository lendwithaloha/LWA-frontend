// src/store/slice/leaseAgreementSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LeaseAgreementState {
  files: File[];
  isVacant: boolean;
}

const initialState: LeaseAgreementState = {
  files: [],
  isVacant: false,
};

const leaseAgreementSlice = createSlice({
  name: "leaseAgreement",
  initialState,
  reducers: {
    // Action to set uploaded files
    setFiles: (state, action: PayloadAction<File[]>) => {
      state.files = action.payload;
      console.log("setFiles action: Files set to", state.files);
    },
    // Action to add a new file to the list
    addFile: (state, action: PayloadAction<File>) => {
      state.files.push(action.payload);
      console.log("addFile action: File added", action.payload);
      console.log("Current files: ", JSON.parse(JSON.stringify(state.files)));
    },
    // Action to remove a file by index
    removeFile: (state, action: PayloadAction<number>) => {
      const removedFile = state.files[action.payload];
      state.files = state.files.filter((_, i) => i !== action.payload);
      console.log("removeFile action: File removed", removedFile);
      console.log("Current files after removal: ", JSON.parse(JSON.stringify(state.files)));
    },
    // Action to set vacancy status
    toggleVacancyStatus: (state) => {
      state.isVacant = !state.isVacant;
      console.log("toggleVacancyStatus action: Vacancy status set to", state.isVacant);
    },
  },
});

export const { setFiles, addFile, removeFile, toggleVacancyStatus } = leaseAgreementSlice.actions;
export default leaseAgreementSlice.reducer;
