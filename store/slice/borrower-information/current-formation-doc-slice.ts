import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface File {
  name: string;
  uploadedDate: string;
}

interface FormationDocsState {
  uploadedFiles: File[];
}

const initialState: FormationDocsState = {
  uploadedFiles: [],
};

const formationDocsSlice = createSlice({
  name: 'formationDocs',
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

export const { addFiles, removeFile } = formationDocsSlice.actions;
export default formationDocsSlice.reducer;
