/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/auth/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  user: {
    id: string;
    name: string;
    role: string;
    phone: string;
  } | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken"),
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; user: any }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
