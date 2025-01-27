import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dishes: [],
};

const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {
    setDishes: (state, action) => {
      state.dishes = action.payload;
    },
    addDish: (state, action) => {
      state.dishes.push(action.payload);
    },
    updateDish: (state, action) => {
      const index = state.dishes.findIndex(
        (dish) => dish._id === action.payload._id
      );
      if (index !== -1) {
        state.dishes[index] = action.payload;
      }
    },
    deleteDish: (state, action) => {
      state.dishes = state.dishes.filter((dish) => dish._id !== action.payload);
    },
  },
});

export const { setDishes, addDish, updateDish, deleteDish } =
  dishesSlice.actions;
export default dishesSlice.reducer;
