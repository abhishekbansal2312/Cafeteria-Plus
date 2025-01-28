import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    dishes: [],
    loading: false,
    error: null,
  },
  reducers: {
    setDishes(state, action) {
      state.dishes = action.payload;
    },
    addDish(state, action) {
      state.dishes.push(action.payload);
    },
    removeDish(state, action) {
      state.dishes = state.dishes.filter((dish) => dish._id !== action.payload);
    },
    increaseQuantity(state, action) {
      const index = state.dishes.findIndex(
        (dish) => dish._id === action.payload
      );
      if (index >= 0) {
        state.dishes[index].quantity += 1;
      }
    },
    decreaseQuantity(state, action) {
      const index = state.dishes.findIndex(
        (dish) => dish._id === action.payload
      );
      if (index >= 0) {
        state.dishes[index].quantity -= 1;
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
  setDishes,
  addDish,
  removeDish,
  increaseQuantity,
  decreaseQuantity,
  setLoading,
  setError,
} = cartSlice.actions;

export default cartSlice.reducer;
