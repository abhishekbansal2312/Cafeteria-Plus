import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    dishes: [],
    loading: false,
    error: null,
    totalCartItems: 0,
  },
  reducers: {
    setCartDishes(state, action) {
      state.dishes = action.payload;
    },
    setTotalCartItems(state, action) {
      if (action.payload === "inc") {
        state.totalCartItems += 1;
      } else if (action.payload === "dec") {
        state.totalCartItems -= 1;
      } else {
        state.totalCartItems = action.payload;
      }
    },
    addCartDish(state, action) {
      state.dishes.push(action.payload);
    },
    removeCartDish(state, action) {
      state.dishes = state.dishes.filter((dish) => dish._id !== action.payload);
    },
    increaseQuantity(state, action) {
      const dish = state.dishes.find((dish) => dish._id === action.payload);
      if (dish) {
        dish.quantity += 1;
      }
    },

    decreaseQuantity(state, action) {
      const dish = state.dishes.find((dish) => dish._id === action.payload);

      if (dish) {
        dish.quantity -= 1;
      }
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setCartDishes,
  setTotalCartItems,
  addCartDish,
  removeCartDish,
  increaseQuantity,
  decreaseQuantity,
  setLoading,
  setError,
} = cartSlice.actions;

export default cartSlice.reducer;
