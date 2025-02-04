import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GuarantorPersonalInfoState {
  isGuarantor: boolean;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  alternatePhoneNumber?: string;
  emailAddress: string;
  citizenshipStatus: string;
  residencyStatus:String;
  numberOfDeliquencies:number;
  ssn: string;
  dob: string;
  maritalStatus: string;
  spouseName?: string;
  estimatedCreditScore: number;
  bankruptcyDischargeDate?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  isMailingAddressDifferent: boolean;
  isFormCompleted: boolean;
  isApplicationSubmitted: boolean;
}

// Initial state with default values
const initialState: GuarantorPersonalInfoState = {
  isGuarantor: false,
  firstName: '',
  lastName: '',
  phoneNumber: '',
  alternatePhoneNumber: '',
  emailAddress: '',
  citizenshipStatus: 'US Citizen',
  residencyStatus:"",
  ssn: '',
  dob: '',
  maritalStatus: 'Single',
  spouseName: '',
  estimatedCreditScore: 0,
  numberOfDeliquencies:0,
  bankruptcyDischargeDate: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  zipCode: '',
  isMailingAddressDifferent: false,
  isFormCompleted: false,
  isApplicationSubmitted: false,
};

const guarantorFormSlice = createSlice({
  name: 'guarantorForm',
  initialState,
  reducers: {
    updateField: <T extends keyof GuarantorPersonalInfoState>(
      state: GuarantorPersonalInfoState,
      action: PayloadAction<{ fieldName: T; value: GuarantorPersonalInfoState[T] }>
    ) => {
      const { fieldName, value } = action.payload;
      state[fieldName] = value;
      console.log(`guarantorForm&apos;s ${fieldName} field updated to ${value}`);
    },

    markFormCompleted: (state: GuarantorPersonalInfoState) => {
      console.log('Marking Guarantor form as completed');
      state.isFormCompleted = true;
    },

    submitApplication: (state: GuarantorPersonalInfoState) => {
      console.log('Submitting Guarantor application');
      state.isApplicationSubmitted = true;
    },
  },
});

// Export actions and reducer
export const { updateField, markFormCompleted, submitApplication } =
  guarantorFormSlice.actions;
export default guarantorFormSlice.reducer;
