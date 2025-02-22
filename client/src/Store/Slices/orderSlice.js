import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderList: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orderList = [...action.payload];
    },
  },
});

export const { addOrder } = orderSlice.actions;

export default orderSlice.reducer;
