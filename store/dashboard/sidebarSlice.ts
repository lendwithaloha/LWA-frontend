import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
  isOpen: boolean;
  activeLink: string;
}

const initialState: SidebarState = {
  isOpen: false,
  activeLink: 'Dashboard',
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    setActiveLink: (state, action: PayloadAction<string>) => {
      state.activeLink = action.payload;
    },
  },
});

export const { toggleSidebar, setActiveLink } = sidebarSlice.actions;

export default sidebarSlice.reducer;
