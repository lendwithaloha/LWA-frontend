import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ParticipantFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  ssn: string;
  email: string;
}

interface ParticipantState {
  formData: ParticipantFormData;
  alertVisible: boolean;
}

const initialState: ParticipantState = {
  formData: {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    ssn: '',
    email: '',
  },
  alertVisible: false,
};

const participantSlice = createSlice({
  name: 'participant',
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<Partial<ParticipantFormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    showAlert: (state) => {
      state.alertVisible = true;
    },
    hideAlert: (state) => {
      state.alertVisible = false;
    },
  },
});

export const { updateFormData, showAlert, hideAlert } = participantSlice.actions;
export default participantSlice.reducer;
