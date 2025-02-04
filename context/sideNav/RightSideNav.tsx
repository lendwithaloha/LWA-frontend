"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SideNavLink } from "@/types/side-nav";

// Helper to load from localStorage
const loadFromLocalStorage = (): SideNavLink[] => {
  try {
    const savedLinks = localStorage.getItem("right-nav-links");
    return savedLinks ? JSON.parse(savedLinks) : [];
  } catch {
    return [];
  }
};

// Helper to save to localStorage
const saveToLocalStorage = (links: SideNavLink[]) => {
  try {
    localStorage.setItem("right-nav-links", JSON.stringify(links));
  } catch {
    console.error("Failed to save links to localStorage");
  }
};

interface SideNavState {
  links: SideNavLink[];
}

const initialState: SideNavState = {
  links: loadFromLocalStorage(),
};

const sideNavSlice = createSlice({
  name: "sideNav",
  initialState,
  reducers: {
    setLinks(state, action: PayloadAction<SideNavLink[]>) {
      state.links = action.payload;
      saveToLocalStorage(state.links); // Persist state
    },
    updateActive(state, action: PayloadAction<string>) {
      const updateLinks = (links: SideNavLink[]): SideNavLink[] =>
        links.map((link) => {
          const isActive = link.route === action.payload;
          const updatedChildren = link.children ? updateLinks(link.children) : [];
          const isAnyChildActive = updatedChildren.some((child) => child.active);

          return {
            ...link,
            active: isActive || isAnyChildActive,
            expand: isAnyChildActive,
            children: updatedChildren,
          };
        });

      state.links = updateLinks(state.links);
      saveToLocalStorage(state.links); // Persist state
    },
  },
});

export const { setLinks, updateActive } = sideNavSlice.actions;
export default sideNavSlice.reducer;
