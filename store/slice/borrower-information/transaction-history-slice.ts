import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface File {
  name: string;
  uploadedDate: string;
}

interface TransactionHistoryState {
  uploadedFiles: File[];
}

const initialState: TransactionHistoryState = {
  uploadedFiles: [ ],
};

const transactionHistorySlice = createSlice({
  name: 'transactionHistory',
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

export const { addFiles, removeFile } = transactionHistorySlice.actions;
export default transactionHistorySlice.reducer;
