import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload ? { ...action.payload } : null;
    },
    logout: (state) => {
      state.user = null;
    },
    updatedAvatar: (state, action) => {
      state.user.avatar = action.payload;
    },
  },
});

export const { setUserDetails, logout, updatedAvatar } = userSlice.actions;

export default userSlice.reducer;
