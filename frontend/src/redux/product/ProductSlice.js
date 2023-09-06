import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductById,
  updateProducts,
} from "./ProductApi";

const initialState = {
  product: null,
  isSuccess: false,
  isLoading: false,
  isError: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getProduct.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.product = payload;
      state.error = null;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(getProduct.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.product = null;
      state.isError = true;
    });

    // get product by id
    builder.addCase(getProductById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getProductById.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.product = payload;
      state.error = null;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(getProductById.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.product = null;
      state.isError = true;
    });

    // created product
    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createProduct.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.isSuccess = true;
      state.isError = false;
      state.product = [...state.product, payload];
    });
    builder.addCase(createProduct.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.product = null;
      state.isError = true;
    });

    // update product
    builder.addCase(updateProducts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateProducts.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.isSuccess = true;
      state.isError = false;
      // state.product = [
      //   { ...state.product[0], images: [payload?.data?.images] },
      // ];
    });
    builder.addCase(updateProducts.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.product = null;
      state.isError = true;
    });

    // delete product by id
    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
      const products = state.product.filter((prd) => prd.uuid !== payload);
      state.isLoading = false;
      state.error = null;
      state.isSuccess = true;
      state.isError = false;
      state.product = products;
    });
    builder.addCase(deleteProduct.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.product = null;
      state.isError = true;
    });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
