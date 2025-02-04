import { createSlice } from '@reduxjs/toolkit';

interface LockedAlertState {
  visible: boolean;
}

const initialState: LockedAlertState = {
  visible: false, // By default, the alert is hidden
};

const lockedAlertSlice = createSlice({
  name: 'lockedAlert',
  initialState,
  reducers: {
    showAlert: (state) => {
      state.visible = true;
    },
    hideAlert: (state) => {
      state.visible = false;
    },
  },
});

export const { showAlert, hideAlert } = lockedAlertSlice.actions;
export default lockedAlertSlice.reducer;
