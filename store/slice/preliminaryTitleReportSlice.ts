// src/store/slice/preliminaryTitleReportSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FileMetadata {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

interface PreliminaryTitleReportState {
  fileMetadata: FileMetadata | null;
  isComplete: boolean;
}

const initialState: PreliminaryTitleReportState = {
  fileMetadata: null,
  isComplete: false,
};

const preliminaryTitleReportSlice = createSlice({
  name: 'preliminaryTitleReport',
  initialState,
  reducers: {
    // Action to set the file metadata (not the entire file)
    setFileMetadata: (state, action: PayloadAction<FileMetadata | null>) => {
        console.log('Setting file metadata');
      state.fileMetadata = action.payload;
      console.log('File metadata set to:', state.fileMetadata);
    },

    markTaskComplete: (state) => {
      state.isComplete = true;
    },
  },
});

export const { setFileMetadata, markTaskComplete } = preliminaryTitleReportSlice.actions;
export default preliminaryTitleReportSlice.reducer;
