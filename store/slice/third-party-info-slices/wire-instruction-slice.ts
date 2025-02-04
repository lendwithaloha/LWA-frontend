import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface File {
  name: string;
  uploadedDate: string;
}

interface UploadWireInstructionState {
  uploadedFiles: File[];
  alertVisible: boolean;
}

const initialState: UploadWireInstructionState = {
  uploadedFiles: [
    {
      name: "Title_-_Wire_Instructions.pdf",
      uploadedDate: "2024-08-13",
    },
  ],
  alertVisible: false,
};

const uploadWireInstructionSlice = createSlice({
  name: 'uploadWireInstruction',
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
    showAlert: (state) => {
      state.alertVisible = true;
    },
    hideAlert: (state) => {
      state.alertVisible = false;
    },
  },
});

export const { addFiles, removeFile, showAlert, hideAlert } =
  uploadWireInstructionSlice.actions;
export default uploadWireInstructionSlice.reducer;
