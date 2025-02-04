import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  entityName: string;
  email: string;
  entityType: string;
  stateOfIncorporation: string;
  einNumber: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  mailingDifferent: boolean;
  foreclosureDate: string;
  signerDifferentEntity: string;
  signerName: string;
  signerTitle: string;
}

interface EntityInformationState {
  formData: FormData;
  alertVisible: boolean;
}

const initialState: EntityInformationState = {
  formData: {
    entityName: '',
    email: '',
    entityType: 'Limited Liability Company',
    stateOfIncorporation: 'CA',
    einNumber: '',
    address1: '',
    address2: '',
    city: '',
    state: 'CA',
    zip: '',
    mailingDifferent: false,
    foreclosureDate: '',
    signerDifferentEntity: 'No',
    signerName: '',
    signerTitle: '',
  },
  alertVisible: false,
};

const entityInformationSlice = createSlice({
  name: 'entityInformation',
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<Partial<FormData>>) => {
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

export const { updateFormData, showAlert, hideAlert } = entityInformationSlice.actions;
export default entityInformationSlice.reducer;
