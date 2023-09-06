// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux/auth/AuthSlice";
import ProductSlice from "../redux/product/ProductSlice";
import ProfileSlice from "../redux/user/UserSlice";
import ToggleSlice from "../redux/toggle/Toggle";

const store = configureStore({
  reducer: {
    auth: authSlice,
    product: ProductSlice,
    profile: ProfileSlice,
    toggle: ToggleSlice,
  },
});

export default store;
