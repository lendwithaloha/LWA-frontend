import { RootState } from "@/store/store";
import customBaseQuery from "@/utils/custom-base-query";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: String;
  phone_number: string;
  username: string;
  role: string;
}

interface UserState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: UserState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{
        user: User;
        accessToken?: string;
        refreshToken?: string;
      }>
    ) {
      state.user = action.payload.user;
    },
    clearUser(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
