import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import usersReducer from "../slices/usersSlice";
import formReducer from "../slices/formSlice";

export const store = configureStore({
  reducer: {
    userDetail: userReducer,
    users: usersReducer,
    form: formReducer,
  },
});
