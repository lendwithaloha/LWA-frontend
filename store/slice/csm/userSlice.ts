import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserApplicationProgress {
  [tabKey: string]: {
    subTabs: { [subTabKey: string]: boolean }; // Sub-tab completion status
    isTabCompleted: boolean; // Overall tab completion status
  };
}

interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  applicationProgress: UserApplicationProgress;
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  applicationProgress: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ id: string; name: string; email: string }>) => {
      const { id, name, email } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
    },
    logoutUser: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.applicationProgress = {};
    },
    updateTabProgress: (state, action: PayloadAction<{ tabKey: string; isCompleted: boolean }>) => {
      const { tabKey, isCompleted } = action.payload;
      if (!state.applicationProgress[tabKey]) {
        state.applicationProgress[tabKey] = { subTabs: {}, isTabCompleted: false };
        console.log("tab key progress: " + state.applicationProgress[tabKey]);
      }
      state.applicationProgress[tabKey].isTabCompleted = isCompleted;
    },
    updateSubTabProgress: (state, action: PayloadAction<{ tabKey: string; subTabKey: string; isCompleted: boolean }>) => {
      const { tabKey, subTabKey, isCompleted } = action.payload;
      if (!state.applicationProgress[tabKey]) {
        state.applicationProgress[tabKey] = { subTabs: {}, isTabCompleted: false };
      }
      state.applicationProgress[tabKey].subTabs[subTabKey] = isCompleted;
      console.log("sub tabs",state.applicationProgress[tabKey].subTabs[subTabKey]);

      // Update the tab completion status
      const allSubTabsCompleted = Object.values(state.applicationProgress[tabKey].subTabs).every(
        (subTabCompleted) => subTabCompleted
      );
      state.applicationProgress[tabKey].isTabCompleted = allSubTabsCompleted;
    },
  },
});

export const { setUser, logoutUser, updateTabProgress, updateSubTabProgress } = userSlice.actions;
export default userSlice.reducer;
