import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InspectionFormState {
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  accessInstructions: string;
  inspectionType: string;
  isApplicationSubmitted:boolean;
  isFormCompleted:boolean;
}

const initialState: InspectionFormState = {
  contactName: 'Garrett Williamson',
  contactPhone: '(714) 351-6939',
  contactEmail: 'garrett@vcohomes.com',
  accessInstructions: 'Virtual inspection. Waiting on a time to inspect the property.',
  inspectionType: 'Virtual Inspection',
  isApplicationSubmitted:false,
  isFormCompleted:false
};

const inspectionFormSlice = createSlice({
  name: 'inspectionForm',
  initialState,
  reducers: {
    updateField: <T extends keyof InspectionFormState>(
      state: InspectionFormState,
      action: PayloadAction<{ fieldName: T; value: InspectionFormState[T] }>
    ) => {
      const { fieldName, value } = action.payload;
      state[fieldName] = value;
      console.log(`${fieldName} updated to ${value}`)
    },
    markFormCompleted: (state: InspectionFormState) => {
      console.log('Marking Inspection Form as completed');
      state.isFormCompleted = true;
    },

  },
});

export const { updateField,markFormCompleted } = inspectionFormSlice.actions;

export default inspectionFormSlice.reducer;
