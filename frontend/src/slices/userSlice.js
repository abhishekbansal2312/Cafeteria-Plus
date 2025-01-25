import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedin: false,
};

const userSlice = createSlice({
  name: "userDetail",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.user = action.payload;
      state.isLoggedin = true;
    },
    logoutUser(state) {
      state.user = null;
      state.isLoggedin = false;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
