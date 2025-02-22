import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlices";
import productReducer from "./Slices/productSlices";
import cartReducer from "./Slices/cartProduct";
import addressReducer from "./Slices/addressSlice";
import orderReducer from "./Slices/orderSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer,
  },
});
