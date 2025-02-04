import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UploadedFile {
  name: string;
  uploadedDate: string;
}

interface signedPurchaseContractState {
  uploadedFiles: UploadedFile[];
  isFormCompleted: boolean;
  isApplicationSubmitted: boolean;
}

const initialState: signedPurchaseContractState = {
  uploadedFiles: [
    {
      name: 'doc.pdf',
      uploadedDate: '2024-08-16',
    },
  ],
  isFormCompleted: false,
  isApplicationSubmitted: false,
};

const uploadSignedPurchaseContractSlice = createSlice({
  name: 'uploadSignedPurchaseContract',
  initialState,
  reducers: {
    addFiles: (state, action: PayloadAction<UploadedFile[]>) => {
      state.uploadedFiles.push(...action.payload);
      console.log(`Files ${action.payload.map(file => file.name)} are added`);
    },
    removeFile: (state, action: PayloadAction<string>) => {
      state.uploadedFiles = state.uploadedFiles.filter(
        (file) => file.name !== action.payload
      );
      console.log(`File ${action.payload} is removed`);
    },
    markFormCompleted: (state) => {
      console.log('Marking the form as completed');
      state.isFormCompleted = true;
    },
    markApplicationSubmitted: (state) => {
      console.log('Marking the application as submitted');
      state.isApplicationSubmitted = true;
    },
  },
});

export const {
  addFiles,
  removeFile,
  markFormCompleted,
  markApplicationSubmitted,
} = uploadSignedPurchaseContractSlice.actions;

export default uploadSignedPurchaseContractSlice.reducer;
