import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface File {
  name: string;
  uploadedDate: string;
}

interface BorrowingAuthorizationState {
  uploadedFiles: File[];
}

const initialState: BorrowingAuthorizationState = {
  uploadedFiles: [  ],
};

const borrowingAuthorizationSlice = createSlice({
  name: 'borrowingAuthorization',
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

export const { addFiles, removeFile } = borrowingAuthorizationSlice.actions;
export default borrowingAuthorizationSlice.reducer;
