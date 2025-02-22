import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addressList: [],
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addAddress: (state, action) => {
      state.addressList = [...action.payload];
    },
  },
});

export const { addAddress } = addressSlice.actions;

export default addressSlice.reducer;
