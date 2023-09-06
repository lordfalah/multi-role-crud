import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const getUsers = createAsyncThunk(
  "users/GET",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`users`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        // Tidak ada respons dari server
        return rejectWithValue("No response from server.");
      }

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return rejectWithValue(message);
    }
  }
);

const addUser = createAsyncThunk(
  "user/POST",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`users`, payload);
      return data;
    } catch (error) {
      if (!error.response) {
        // Tidak ada respons dari server
        return rejectWithValue("No response from server.");
      }

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return rejectWithValue(message);
    }
  }
);

const deleteUser = createAsyncThunk(
  "user/DELETE",
  async (payload, { rejectWithValue }) => {
    try {
      await api.delete(`users/${payload}`);
      return payload;
    } catch (error) {
      if (!error.response) {
        // Tidak ada respons dari server
        return rejectWithValue("No response from server.");
      }

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return rejectWithValue(message);
    }
  }
);

const getUserById = createAsyncThunk(
  "user/GET",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.get(`users/${payload}`);
      return [res?.data];
    } catch (error) {
      if (!error.response) {
        // Tidak ada respons dari server
        return rejectWithValue("No response from server.");
      }

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return rejectWithValue(message);
    }
  }
);

const updateUser = createAsyncThunk(
  "users/PUT",
  async (payload, { rejectWithValue }) => {
    try {
      const { uuid, name, password, confirmPassword, role } = payload;
      await api.put(`users/${uuid}`, {
        name,
        password,
        confirmPassword,
        role,
      });

      return payload;
    } catch (error) {
      if (!error.response) {
        // Tidak ada respons dari server
        return rejectWithValue("No response from server.");
      }

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return rejectWithValue(message);
    }
  }
);

export { getUsers, addUser, deleteUser, getUserById, updateUser };
