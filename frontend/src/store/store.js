import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import usersReducer from "../slices/usersSlice";
import formReducer from "../slices/formSlice";
import counterReducer from "../slices/counterSlice";
import dishesReducer from "../slices/dishesSlice";
import merchantReducer from "../slices/merchantsSlice";
import cartReducer from "../slices/cartSlice";
import counterReviewsReducer from "../slices/counterReviewsSlice";

export const store = configureStore({
  reducer: {
    userDetail: userReducer,
    users: usersReducer,
    form: formReducer,
    counter: counterReducer,
    dishes: dishesReducer,
    merchants: merchantReducer,
    cart: cartReducer,
    counterReviews: counterReviewsReducer,
  },
});
