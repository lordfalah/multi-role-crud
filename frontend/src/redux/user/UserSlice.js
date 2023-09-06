import { createSlice } from "@reduxjs/toolkit";
import {
  addUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "./UserApi";

const initialState = {
  profiles: null,
  isSuccess: false,
  isLoading: false,
  isError: false,
  error: null,
};

const ProfileSlice = createSlice({
  name: "Profiles",
  initialState,
  reducers: {
    reset: () => initialState,
  },

  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.profiles = payload;
      state.error = null;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(getUsers.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.profiles = null;
      state.isError = true;
    });

    // post user
    builder.addCase(addUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.isSuccess = true;
      state.isError = false;
      // const { email, uuid, role, name } = payload.data;
      state.profiles = [...state.profiles, payload?.data];
      // state.profiles.push({ email, uuid, role, name });
    });
    builder.addCase(addUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.profiles = null;
      state.isError = true;
    });

    // get user by id
    builder.addCase(getUserById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getUserById.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.profiles = payload;
      state.error = null;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(getUserById.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.product = null;
      state.isError = true;
    });

    // delete user by id
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      const profile = state.profiles.filter((prd) => prd.uuid !== payload);
      state.isLoading = false;
      state.error = null;
      state.isSuccess = true;
      state.isError = false;
      state.profiles = profile;
    });
    builder.addCase(deleteUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.product = null;
      state.isError = true;
    });

    // update user by id
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.isSuccess = true;
      state.isError = false;
      const { uuid, email, name, role } = payload;
      state.profiles = [{ uuid, email, name, role }];
    });
    builder.addCase(updateUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.product = null;
      state.isError = true;
    });
  },
});

export const { reset } = ProfileSlice.actions;
export default ProfileSlice.reducer;
