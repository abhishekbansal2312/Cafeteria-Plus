import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import usersReducer from "../slices/usersSlice";
import formReducer from "../slices/formSlice";
import counterReducer from "../slices/counterSlice";
import counterFormReducer from "../slices/counterFormSlice";

export const store = configureStore({
  reducer: {
    userDetail: userReducer,
    users: usersReducer,
    form: formReducer,
    counter: counterReducer,
    counterForm: counterFormReducer,
  },
});
