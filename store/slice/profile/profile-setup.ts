import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UploadedFileType } from "@/components/common/FileUploadAction";

export interface myAgent {
  firstName: string;
  lastName: string;
}
export type ValidationDocument = "passport" | "national_id" | "drivers_license";

export interface FormData {
  firstName: string;
  lastName: string;
  dob: string;
  maritalStatus: string;
  phone: string;
  email: string;
  employerName: string;
  employerAddress: "current" | "mailing_address" | 'other';
  selfEmployed: string;

  employerCurrentStreetAddress: string;
  employerCurrentState: string;
  employerCurrentCity: string;
  employerCurrentZip: string;
  position: string;
  mailingStreetAddress: string;
  mailingAddressCurrentAddress: string;
  mailingState: string;
  mailingCity: string;
  mailingZip: string;
  employerPosition: string;
  yearsEmployed: number;
  annualIncome: number;
  creditScore: number;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  mailingAddress: string;
  residencyType: string;
  monthlyRent: number;
  mortgagePayment: number;
  currentAddressYears: string;
  passportFiles: string;
  insuranceAgent: string;
  propertyStreetAddress: string;
  propertyCity: string;
  propertyState: string;
  propertyZip: string;
  propertyType: string;
  entityVesting: string;
  ownershipPercentage: string;
  investmentStrategy: string;
  acquisitionDate: string;
  acquisitionPrice: string;
  contractPrice: string;
  coe: string;
  budgetCompleted: string;
  marketValue: string;
  loanBalance: string;
  rentalIncome: string;
  employerOtherStreetAddress: string;
  employerOtherZip: string;
  employerOtherState: string;
  employerOtherCity: string;

  employeeStreetAddress: string;
  validationDocuments: ValidationDocument[];
  employeeState: string;
  employeeCity: string;
  employeeZip: string;
  usCitizen: string;
  ownershipInterest: string;
  judgmentsAgainst: string;
  bankruptcy: string;
  foreclosure: string;
  lawsuit: string;
  criminalOffense: string;
  delinquentDebt: string;
  loanObligation: string;
  alimonySupport: string;
  borrowedDownPayment: string;
  coMakerEndorser: string;
  primaryResidence: string;
  closingAgent: string;
  idFileApproval: string;
  idFile: UploadedFileType | null;
  entityFiles: UploadedFileType[];
  entityFileApprovals: string[];
  bankStatements: UploadedFileType | null;
  bankStatementsApproval: string;
}



interface FormState {
  currentStep: number;
  formData: FormData;
}

const initialState: FormState = {
  currentStep: 1,
  formData: {
    firstName: "",
    lastName: "",
    dob: "",
    maritalStatus: "married",
    phone: "",
    email: "",
    selfEmployed: "true",
    employerName: "",
    employerAddress: "current",
    mailingAddressCurrentAddress: "true",
    employerCurrentStreetAddress: "",
    employerCurrentZip: "",
    employerCurrentState: "",
    employerCurrentCity: "",
    employerOtherStreetAddress: "",
    employerOtherZip: "",
    employerOtherState: "",
    employerOtherCity: "",

    employeeStreetAddress: "",
    validationDocuments: [],

    employeeState: "",
    employeeCity: "",
    employeeZip: "",
    position: "",
    mailingStreetAddress: "",
    mailingState: "",
    mailingCity: "",
    mailingZip: "",
    employerPosition: "",
    yearsEmployed: 0,
    annualIncome: 5000,
    creditScore: 0,
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    mailingAddress: "",
    residencyType: "true",
    mortgagePayment: 0,
    monthlyRent: 0, currentAddressYears: "",
    passportFiles: "",
    propertyStreetAddress: "",
    propertyCity: "",
    propertyState: "",
    propertyZip: "",
    propertyType: "",
    entityVesting: "",
    ownershipPercentage: "",
    investmentStrategy: "",
    acquisitionDate: "",
    acquisitionPrice: "",
    contractPrice: "",
    coe: "",
    budgetCompleted: "no",
    marketValue: "",
    loanBalance: "",
    rentalIncome: "",
    usCitizen: "yes",
    ownershipInterest: "yes",
    judgmentsAgainst: "no",
    bankruptcy: "no",
    foreclosure: "no",
    lawsuit: "no",
    criminalOffense: "no",
    delinquentDebt: "no",
    loanObligation: "no",
    alimonySupport: "no",
    borrowedDownPayment: "no",
    coMakerEndorser: "no",
    primaryResidence: "no",
    closingAgent: "Use an LWA Partner",
    insuranceAgent: "Use an LWA Partner",

    idFile: null,
    idFileApproval: "Approved",
    entityFiles: [],
    bankStatements: null,
    bankStatementsApproval: "Rejected",
    entityFileApprovals: ["", "", ""],
  },
};

const profileSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updateFormData: (state, action: PayloadAction<Partial<FormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setIdFile: (state, action: PayloadAction<UploadedFileType | null>) => {
      state.formData.idFile = action.payload;
    },
    setEntityFiles: (state, action: PayloadAction<UploadedFileType[]>) => {
      state.formData.entityFiles = action.payload;
    },
    setBankStatements: (
      state,
      action: PayloadAction<UploadedFileType | null>
    ) => {
      state.formData.bankStatements = action.payload;
    },
  },
});

export const {
  setCurrentStep,
  updateFormData,
  setIdFile,
  setEntityFiles,
  setBankStatements,
} = profileSlice.actions;
export default profileSlice.reducer;
