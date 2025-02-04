// store/slices/uploadPrelimTitleSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UploadedFile {
  name: string;
  uploadedDate: string;
}

interface UploadPrelimTitleState {
  uploadedFiles: UploadedFile[];
  alertVisible: boolean;
}

const initialState: UploadPrelimTitleState = {
  uploadedFiles: [ ],
  alertVisible: false,
};

const uploadPrelimTitleSlice = createSlice({
  name: "uploadPrelimTitle",
  initialState,
  reducers: {
    setUploadedFiles: (state, action: PayloadAction<UploadedFile[]>) => {
      state.uploadedFiles = action.payload;
    },
    addUploadedFile: (state, action: PayloadAction<UploadedFile>) => {
      state.uploadedFiles.push(action.payload);
    },
    removeUploadedFile: (state, action: PayloadAction<string>) => {
      state.uploadedFiles = state.uploadedFiles.filter(
        (file) => file.name !== action.payload
      );
    },
    toggleAlert: (state, action: PayloadAction<boolean>) => {
      state.alertVisible = action.payload;
    },
  },
});

export const { setUploadedFiles, addUploadedFile, removeUploadedFile, toggleAlert } =
  uploadPrelimTitleSlice.actions;

export default uploadPrelimTitleSlice.reducer;
