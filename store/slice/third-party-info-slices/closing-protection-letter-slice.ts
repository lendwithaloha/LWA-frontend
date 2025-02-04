// src/store/slices/uploadClosingProtectionSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UploadClosingProtectionState {
  alertVisible: boolean;
  uploadedFiles: { name: string; uploadedDate: string }[];
}

const initialState: UploadClosingProtectionState = {
  alertVisible: false,
  uploadedFiles: [  ],
};

const uploadClosingProtectionSlice = createSlice({
  name: 'uploadClosingProtection',
  initialState,
  reducers: {
    toggleAlert: (state, action: PayloadAction<boolean>) => {
      state.alertVisible = action.payload;
    },
    addUploadedFile: (state, action: PayloadAction<{ name: string; uploadedDate: string }>) => {
      state.uploadedFiles.push(action.payload);
    },
    removeUploadedFile: (state, action: PayloadAction<string>) => {
      state.uploadedFiles = state.uploadedFiles.filter((file) => file.name !== action.payload);
    },
  },
});

export const { toggleAlert, addUploadedFile, removeUploadedFile } = uploadClosingProtectionSlice.actions;

export default uploadClosingProtectionSlice.reducer;
