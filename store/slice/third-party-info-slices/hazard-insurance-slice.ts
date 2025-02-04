import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface File {
  name: string;
  uploadedDate: string;
}

interface UploadHazardInsuranceState {
  uploadedFiles: File[];
  alertVisible: boolean;
}

const initialState: UploadHazardInsuranceState = {
  uploadedFiles: [],
  alertVisible: false,
};

const uploadHazardInsuranceSlice = createSlice({
  name: 'uploadHazardInsurance',
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
  uploadHazardInsuranceSlice.actions;
export default uploadHazardInsuranceSlice.reducer;
