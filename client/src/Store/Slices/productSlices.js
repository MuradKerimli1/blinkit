import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCategory: [],
  subCategory: [],
  product: [],
  categoryLoading: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setAllCategory: (state, action) => {
      state.allCategory = [...action.payload];
    },
    setCategoryLoading: (state, action) => {
      state.categoryLoading = action.payload;
    },
    setAllSubCategory: (state, action) => {
      state.subCategory = [...action.payload];
    },
    setAllProduct: (state, action) => {
      state.product = [...action.payload];
    },
  },
});

export const {
  setAllCategory,
  setCategoryLoading,
  setAllSubCategory,
  setAllProduct,
} = productSlice.actions;

export default productSlice.reducer;
