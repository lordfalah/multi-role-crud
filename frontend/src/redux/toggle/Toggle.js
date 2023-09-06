import { createSlice } from "@reduxjs/toolkit";

const ToggleSlice = createSlice({
  name: "toggle",
  initialState: {
    isOpen: false,
  },
  reducers: {
    setIsOpen: (state, { payload }) => {
      state.isOpen = payload;
    },
  },
});

export const { setIsOpen } = ToggleSlice.actions;
export default ToggleSlice.reducer;
