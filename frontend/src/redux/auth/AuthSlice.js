// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { auth, loginUser, logout } from "./AuthApi";

const initialState = {
  user: JSON.parse(localStorage.getItem("auth"))
    ? JSON.parse(localStorage.getItem("auth"))
    : null,
  isSuccess: false,
  isLoading: false,
  isError: false,
  error: null,
};

// Tindakan async untuk melakukan autentikasi login melalui API
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => ({ ...state, user: null }),
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      state.error = null;
      state.isSuccess = true;
      state.isError = false;
      localStorage.setItem("auth", JSON.stringify(payload));
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.user = null;
      state.isError = true;
    });

    // get me
    builder.addCase(auth.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(auth.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      state.error = null;
      state.isSuccess = true;
      state.isError = false;

      if (!JSON.parse(localStorage.getItem("auth"))) {
        localStorage.setItem("auth", JSON.stringify(payload));
      }
    });
    builder.addCase(auth.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.user = null;
      state.isError = true;
    });

    // logout
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = null;
      state.error = null;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(logout.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.isError = true;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
