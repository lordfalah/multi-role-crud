import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const getProduct = createAsyncThunk(
  "product/getProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`product`);

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

const getProductById = createAsyncThunk(
  "product/getProductById",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.get(`product/${payload}`);
      return [response.data];
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

const createProduct = createAsyncThunk(
  "product/createProduct",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const response = await api.post(`product`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { auth } = getState((state) => state);
      return {
        ...response?.data?.data,
        user: {
          name: auth.user.name,
          email: auth.user.email,
        },
      };
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

const updateProducts = createAsyncThunk(
  "product/updateProducts",
  async ({ id, ...payloads }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`product/${id}`, payloads, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return { ...data, id };
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

const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (payload, { rejectWithValue }) => {
    try {
      await api.delete(`product/${payload}`);
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

export {
  getProduct,
  createProduct,
  getProductById,
  updateProducts,
  deleteProduct,
};
