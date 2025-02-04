import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SpousalConsentDocument {
  name: string;
  uploadedDate: string;
}

interface SpousalConsentState {
  uploadedDocuments: SpousalConsentDocument[];
  isFormCompleted: boolean;
  isApplicationSubmitted: boolean;
}

const initialState: SpousalConsentState = {
  uploadedDocuments: [],
  isFormCompleted: false,
  isApplicationSubmitted: false,
};

const spousalConsentSlice = createSlice({
  name: 'spousalConsent',
  initialState,
  reducers: {
    addDocument: (state, action: PayloadAction<SpousalConsentDocument>) => {
      state.uploadedDocuments.push(action.payload);
      console.log(`Document ${action.payload.name} uploaded on ${action.payload.uploadedDate}`);
    },
    removeDocument: (state, action: PayloadAction<string>) => {
      state.uploadedDocuments = state.uploadedDocuments.filter(
        (doc) => doc.name !== action.payload
      );
      console.log(`Document ${action.payload} removed`);
    },
    markTaskCompleted: (state) => {
      state.isFormCompleted = true;
      console.log('Task marked as completed');
    },

  
  },
});

export const { addDocument, removeDocument, markTaskCompleted } = spousalConsentSlice.actions;
export default spousalConsentSlice.reducer;
