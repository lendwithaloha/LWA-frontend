import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface File {
  name: string;
  uploadedDate: string;
}

interface VoidedCheckState {
  uploadedFiles: File[];
}

const initialState: VoidedCheckState = {
  uploadedFiles: [ ],
};

const voidedCheckSlice = createSlice({
  name: 'voidedCheck',
  initialState,
  reducers: {
    addFiles: (state, action: PayloadAction<File[]>) => {
      state.uploadedFiles = [...state.uploadedFiles, ...action.payload];
    },
    removeFile: (state, action: PayloadAction<string>) => {
      state.uploadedFiles = state.uploadedFiles.filter(
        (file) => file.name !== action.payload
      );
    },
  },
});

export const { addFiles, removeFile } = voidedCheckSlice.actions;
export default voidedCheckSlice.reducer;
