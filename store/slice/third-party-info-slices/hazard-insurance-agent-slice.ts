import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
    name: string;
    phone: string;
    email: string;
}

interface HazardInsuranceAgentState {
    formData: FormData;
    alertVisible: boolean;
}

const initialState: HazardInsuranceAgentState = {
    formData: {
        name: "",
        phone: "",
        email: "",
    },
    alertVisible: false,
};

const hazardInsuranceAgentSlice = createSlice({
    name: 'hazardInsuranceAgent',
    initialState,
    reducers: {
        updateFormData: (state, action: PayloadAction<FormData>) => {
            state.formData = { ...state.formData, ...action.payload };
            console.log(state.formData);
        },
        showAlert: (state) => {
            state.alertVisible = true;
        },
        hideAlert: (state) => {
            state.alertVisible = false;
        },
    },
});

export const { updateFormData, showAlert, hideAlert } =
    hazardInsuranceAgentSlice.actions;
export default hazardInsuranceAgentSlice.reducer;
