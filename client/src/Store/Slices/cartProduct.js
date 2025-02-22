import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: [],
};
export const cartProductSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    handleAddItem: (state, action) => {
      state.cart = [...action.payload];
    },
  },
});

export const {handleAddItem} = cartProductSlice.actions;

export default cartProductSlice.reducer;
