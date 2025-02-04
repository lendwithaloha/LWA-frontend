import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface signedDisclosuretDocument {
  name: string;
  uploadedDate: string;
}

interface signedDisclosureState {
  uploadedDocuments: signedDisclosuretDocument[];
  isFormCompleted: boolean;
  isApplicationSubmitted: boolean;
}

const initialState: signedDisclosureState = {
  uploadedDocuments: [],
  isFormCompleted: false,
  isApplicationSubmitted: false,
};

const spousalConsentSlice = createSlice({
  name: 'signedDisclosure',
  initialState,
  reducers: {
    addDocument: (state, action: PayloadAction<signedDisclosuretDocument>) => {
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
