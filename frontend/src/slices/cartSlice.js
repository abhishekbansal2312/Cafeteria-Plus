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
      console.log(action.payload);

      const dish = state.dishes.find((dish) => dish._id === action.payload);
      if (dish) {
        dish.quantity += 1;
      }
    },

    decreaseQuantity(state, action) {
      const dish = state.dishes.find((dish) => dish._id === action.payload);
      console.log(dish);

      if (dish) {
        dish.quantity -= 1;
      }
      console.log(dish, "decrease");
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
